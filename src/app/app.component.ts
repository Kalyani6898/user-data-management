import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UserDataService } from './service/user-data.service';
import { User, UserData } from './module/user.module';
import { getUserDataAction, updateUserData } from './store/data.actions';
import { selectUser } from './store/data.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [UserDataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<{ data: UserData }>) {}
  isLoading: boolean = false;
  usersData: User[] = [];
  firstName = '';

  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
  });

  columnsToDisplay = ['id', 'firstName', 'lastName', 'gender', 'age'];
  columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay];
  expandedElement: User | undefined;

  get getFirstName() {
    return this.userForm.get('firstName');
  }

  get getLastName() {
    return this.userForm.get('lastName');
  }

  get getAge() {
    return this.userForm.get('age');
  }

  get getGender() {
    return this.userForm.get('gender');
  }

  ngOnInit(): void {
    this.getUserData();
    this.storeUserData();
  }
  /**
   * to get user data from API
   */
  getUserData(): void {
    this.store.dispatch(getUserDataAction());
  }

  /**
   * To get user data from store and store it in component variable
   */
  storeUserData(): void {
    this.store.select(selectUser).subscribe((users) => {
      this.usersData = users.data.users;
    });
  }

  /**
   * To submit the form
   * @param element : selected User
   */
  onSubmit(element: User): void {
    this.isLoading = true;
    setTimeout(() => {
      this.updateDataToStore(element.id);
      this.toggleAccordion(element);
      this.userForm.reset();
      this.isLoading = false;
    }, 3000);
  }

  /**
   * To reset the form and close accordion
   * @param element : Selected User
   */
  onClose(element: User): void {
    this.userForm.reset();
    this.toggleAccordion(element);
  }

  /**
   * To toggle accordian of selected user
   * @param element : Selected User
   */
  toggleAccordion(element: User) {
    this.expandedElement =
      this.expandedElement === element ? undefined : element;
  }

  /**
   * To update store with form data
   * @param id : id of the selected user
   */
  updateDataToStore(id: Number): void {
    if (
      !!this.userForm.value.firstName &&
      !!this.userForm.value.lastName &&
      !!this.userForm.value.age &&
      !!this.userForm.value.gender
    )
      this.store.dispatch(
        updateUserData({
          id: id,
          firstName: this.userForm.value.firstName,
          lastName: this.userForm.value.lastName,
          age: Number(this.userForm.value.age),
          gender: this.userForm.value.gender,
        })
      );
  }
}
