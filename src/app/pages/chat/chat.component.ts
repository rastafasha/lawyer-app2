import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { UserService } from '../../services/usuario.service';
import { ProfileService } from '../../services/profile.service';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { Client } from '../../models/client.model';
import { NgFor, NgIf } from '@angular/common';
import { ClientService } from '../../services/client.service';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { MessageService } from '../../services/message.service';
import { Profile } from '../../models/profile.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  imports: [HeaderComponent, FormsModule, NgIf, NgFor, BackButtnComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  public message: string = '';
  public tema: string = '';
  public messages: any;
  public user_selected!: any;
  pageTitle = 'Chat';

  public user!: Usuario;
  public user_id!: number;
  public client!: Client;
  public client_id!: number;
  public profile!: Profile;

  constructor(
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private clientService: ClientService,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => this.getUser(id));
  }

  public sendMessage() {
    if (this.message.length < 0) {
      return;
    }
    this.chatService.sendMessage(this.message);
    this.enviarMensaje(this.message);
    this.messages.push(this.message);
    this.message = '';
  }

  getUser(id: string) {
    this.clientService.getClient(id).subscribe((resp: any) => {
      this.client = resp[0];
      this.profile = resp[0].profile;
      this.client_id = resp[0].profile.client_id;
    });
    setTimeout(() => {
      this.listMessage();
    }, 1000);
  }
  
  public listMessage() {
    this.messageService
      .getByUser(this.user.id, this.client_id)
      .subscribe((resp: any) => {
        this.messages = resp;
        console.log(this.messages);
      });
  }

  enviarMensaje(data: any) {
    const formData = new FormData();
    formData.append('user_id', this.user.id + '');
    formData.append('cliente_id', this.client_id + '');
    formData.append('message', this.message);

    this.messageService.createMessage(formData).subscribe({
      next: (resp: any) => {
        this.message = resp;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
