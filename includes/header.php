<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BrpirCatalog</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/dark-mode.css">
    <?php if(basename($_SERVER['PHP_SELF']) == 'index.php'): ?>
        <link rel="stylesheet" href="assets/css/auth.css">
    <?php elseif(basename($_SERVER['PHP_SELF']) == 'home.php'): ?>
        <link rel="stylesheet" href="assets/css/profiles.css">
    <?php elseif(basename($_SERVER['PHP_SELF']) == 'catalog.php'): ?>
        <link rel="stylesheet" href="assets/css/catalog.css">
    <?php endif; ?>
    <link rel="stylesheet" href="assets/css/modal.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">