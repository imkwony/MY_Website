// News: show the latest 5, expand the rest on click.
const news = document.querySelector('.news');
const btn = document.getElementById('news-more');
if (news && btn) {
  const extra = news.querySelectorAll('li.extra').length;
  if (!extra) btn.remove();
  else {
    btn.textContent = `Show all (${news.children.length})`;
    btn.addEventListener('click', () => {
      const open = news.classList.toggle('open');
      btn.textContent = open ? 'Show less' : `Show all (${news.children.length})`;
    });
  }
}
document.getElementById('year').textContent = new Date().getFullYear();
