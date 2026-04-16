<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Mail</title>
</head>
<body>
    <h1>Bienvenue {{ $data['lastName'] }} {{$data['firstName']}} à l'EGLISE Des Jeunes Prodiges de Porto Novo</h1>
    <p>Veiller cliquer sur ce lien pour vérifier votre email </p>

    <p>Ce lien expirera dans 60 minutes.</p>
    <hr>
    <p style="font-size: 12px; color: #6b7280;">
        Si le bouton ne fonctionne pas, copiez ce lien : <br>
        {{ $data['verificationLink'] }}
    </p>
</body>
</html>