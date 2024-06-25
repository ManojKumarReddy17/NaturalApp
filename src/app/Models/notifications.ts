export class Notifications {
  id: string;
  subject: string;
  body: string;

  constructor(id: string, subject: string, body: string) {
    this.id = id;
    this.subject = subject;
    this.body = body;
  }
}

