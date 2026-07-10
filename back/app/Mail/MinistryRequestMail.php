<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MinistryRequestMail extends Mailable
{
    use Queueable, SerializesModels;

    public $nom;
    public $email;
    public $ministryName;
    public $messageContent;

    public function __construct($nom, $email, $ministryName, $messageContent)
    {
        $this->nom = $nom;
        $this->email = $email;
        $this->ministryName = $ministryName;
        $this->messageContent = $messageContent;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nouvelle demande de ministère - EJP',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.ministryRequest',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
