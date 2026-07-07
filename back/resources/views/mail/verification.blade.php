<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vérification d'email</title>
</head>
<body>
    <h1>Bienvenue {{ $data['firstName'] }} {{ $data['lastName'] }} à l'Église des Jeunes Prodiges de Porto-Novo</h1>
    <p>Merci de t'être inscrit ! Veuillez cliquer sur le lien ci-dessous pour vérifier ton adresse email :</p>
    <p>
        <a href="{{ $data['verificationLink'] }}" style="display: inline-block; padding: 12px 24px; background-color: #d97706; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Vérifier mon email
        </a>
    </p>
    <p>Ce lien expirera dans 60 minutes.</p>
    <hr>
    <p style="font-size: 12px; color: #6b7280;">
        Si le bouton ne fonctionne pas, copie ce lien dans ton navigateur : <br>
        {{ $data['verificationLink'] }}
    </p>
</body>
</html>