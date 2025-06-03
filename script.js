<script>
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('mobileSidebar');
  const closeBtn = document.getElementById('closeSidebar');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('active');
  });

  closeBtn.addEventListener('click', () => {
    hamburger.classList.remove('active');
    sidebar.classList.remove('active');
  });
</script>
