// dynamic.js — sample posts array, render, filter & sort
const samplePosts = [
  {id:1, title:'New Kitchen Opened in Woodstock', date:'2025-10-01', body:'We launched a new community kitchen...'},
  {id:2, title:'Volunteer Tutor Success Stories', date:'2025-09-12', body:'Our tutoring programme produced strong results...'},
  {id:3, title:'Sponsorship Drive Results', date:'2025-08-20', body:'Thanks to donors, we fed 1200 children...'}
];

function renderPosts(posts){
  const container = document.getElementById('posts');
  if(!container) return;
  container.innerHTML = '';
  posts.forEach(p=>{
    const el = document.createElement('article');
    el.className = 'post';
    el.innerHTML = `<h3>${p.title}</h3><time>${p.date}</time><p>${p.body}</p>`;
    container.appendChild(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // initial render (newest first)
  renderPosts(samplePosts.sort((a,b)=> new Date(b.date)-new Date(a.date)));

  const search = document.getElementById('search');
  const sort = document.getElementById('sort');

  if(search){
    search.addEventListener('input', function(){
      const q = this.value.trim().toLowerCase();
      const filtered = samplePosts.filter(p => p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q));
      renderPosts(filtered);
    });
  }

  if(sort){
    sort.addEventListener('change', function(){
      let out = [...samplePosts];
      if(this.value === 'az') out.sort((a,b)=> a.title.localeCompare(b.title));
      else if(this.value === 'za') out.sort((a,b)=> b.title.localeCompare(a.title));
      else out.sort((a,b)=> new Date(b.date)-new Date(a.date));
      renderPosts(out);
    });
  }
});
