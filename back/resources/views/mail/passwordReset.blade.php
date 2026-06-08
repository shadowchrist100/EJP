<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset </title>
</head>
<body>
    <h1>Réinitialisation de votre mot de passe</h1>
    <p>Vous recevez cet email car nous avons reçu une demande de réinitialisation de mot de passe pour votre compte.</p>
    <p>Veuillez cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
    <p><a href="{{ $resetLink }}" style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px;">Réinitialiser le mot de passe</a></p>
    <p>Ce lien de réinitialisation expira dans 60 minutes.</p>
    <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, aucune autre action n'est requise.</p>
    <hr>
    <p style="font-size: 12px; color: #6b7280;">
        Si le bouton ne fonctionne pas, copiez ce lien : <br>
        {{ $resetLink }}
    </p>
</body>
</html>