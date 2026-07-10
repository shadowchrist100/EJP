<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    public $nom;
    public $email;
    public $messageContent;

    public function __construct($nom, $email, $messageContent)
    {
        $this->nom = $nom;
        $this->email = $email;
        $this->messageContent = $messageContent;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nouveau message de contact - EJP',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.contact',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
