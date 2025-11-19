// main.js — general UI interactions
document.addEventListener('DOMContentLoaded', function() {
  // Year filler
  const y = new Date().getFullYear();
  ['year','year-2','year-3','year-4','year-5'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = y;
  });

  // Tabs
  document.querySelectorAll('.tabs button').forEach(btn=>{
    btn.addEventListener('click', function(){
      const tab = this.dataset.tab;
      document.querySelectorAll('.tabs button').forEach(b=>b.setAttribute('aria-selected','false'));
      this.setAttribute('aria-selected','true');
      document.querySelectorAll('.tab-panel').forEach(panel=>{
        panel.hidden = panel.id !== tab;
      });
    });
  });

  // Accordion
  document.querySelectorAll('.accordion-toggle').forEach(t=>{
    t.addEventListener('click', function(){
      const panel = this.nextElementSibling;
      const visible = panel.style.display === 'block';
      document.querySelectorAll('.accordion-panel').forEach(p=>p.style.display='none');
      panel.style.display = visible ? 'none' : 'block';
    });
  });

  // Sponsor options show/hide based on enquiry type
  const etype = document.getElementById('etype');
  const sponsorOptions = document.getElementById('sponsor-options');
  if(etype){
    etype.addEventListener('change', (e)=>{
      if(e.target.value === 'sponsor'){
        sponsorOptions.hidden = false;
        sponsorOptions.removeAttribute('aria-hidden');
      } else {
        sponsorOptions.hidden = true;
        sponsorOptions.setAttribute('aria-hidden','true');
      }
    });
  }

  // Smooth scroll for internal links if desired
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
});
