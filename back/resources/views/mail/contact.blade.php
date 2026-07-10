<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau message de contact</title>
</head>
<body>
    <h1>Nouveau message de contact</h1>
    <p><strong>Nom :</strong> {{ $nom }}</p>
    <p><strong>Email :</strong> {{ $email }}</p>
    <p><strong>Message :</strong></p>
    <p>{{ $messageContent }}</p>
    <hr>
    <p style="font-size: 12px; color: #6b7280;">
        Eglise des Jeunes Prodiges — Porto-Novo
    </p>
</body>
</html>
