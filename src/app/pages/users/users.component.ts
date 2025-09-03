import { Component } from '@angular/core';
import { UsersStore } from '../../stores/users.store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent {
  users$ = this.store.users$;
  loading$ = this.store.loading$;
  displayDialog = false;
  editing: any = null;
  user: { id?: any; name: string; email: string } = { id: '', name: '', email: '' };

  constructor(private store: UsersStore) {}

  openCreate() {
    this.editing = null;
    this.user = { id: '', name: '', email: '' };
    this.displayDialog = true;
  }
  openEdit(u: any) {
    this.editing = u;
    this.user = { id: u.id, name: u.name, email: u.email };
    this.displayDialog = true;
  }

  save() {
    const val = { id: this.user.id, name: this.user.name, email: this.user.email };
    if (this.editing) {
      this.store.update(this.editing.id, val).subscribe(() => this.displayDialog = false);
    } else {
      this.store.create(val).subscribe(() => this.displayDialog = false);
    }
  }

  remove(id: any) { if (confirm('Remover usuário?')) this.store.delete(id).subscribe(); }
}
