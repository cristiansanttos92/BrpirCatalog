</div>
    <script src="assets/js/utils.js"></script>
    <script src="assets/js/storage.js"></script>
    <script src="assets/js/main.js"></script>
    <?php if(basename($_SERVER['PHP_SELF']) == 'index.php'): ?>
        <script src="assets/js/auth.js"></script>
    <?php elseif(basename($_SERVER['PHP_SELF']) == 'home.php'): ?>
        <script src="assets/js/profiles.js"></script>
        <script src="assets/js/modal.js"></script>
    <?php elseif(basename($_SERVER['PHP_SELF']) == 'catalog.php'): ?>
        <script src="assets/js/catalog.js"></script>
        <script src="assets/js/filters.js"></script>
    <?php endif; ?>
</body>
</html>