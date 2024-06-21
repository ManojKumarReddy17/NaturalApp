export class Notifications {
  id: string;
  subject: string;
  body: string;
  isRead: boolean;

  constructor(id: string, subject: string, body: string, isRead: boolean) {
    this.id = id;
    this.subject = subject;
    this.body = body;
    this.isRead = isRead;
  }
}

