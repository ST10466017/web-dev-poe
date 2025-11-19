// validation.js — handles enquiry and contact forms
document.addEventListener('DOMContentLoaded', () => {
  // Utility validators
  function validEmail(e){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
  function validPhone(p){ return p === '' || /^\+?[0-9\s-]{7,15}$/.test(p); }

  // Enquiry form
  const enquiryForm = document.getElementById('enquiry-form');
  if(enquiryForm){
    enquiryForm.addEventListener('submit', (ev)=>{
      ev.preventDefault();
      const name = enquiryForm.name.value.trim();
      const email = enquiryForm.email.value.trim();
      const phone = enquiryForm.phone.value.trim();
      const type = enquiryForm.type.value;
      const message = enquiryForm.message.value.trim();
      const result = document.getElementById('enquiry-result');

      // Basic validations
      if(!name || !email || !type || !message){
        result.textContent = 'Please fill in all required fields.';
        result.style.color = 'crimson';
        return;
      }
      if(!validEmail(email)){
        result.textContent = 'Please enter a valid email address.';
        result.style.color = 'crimson';
        return;
      }
      if(!validPhone(phone)){
        result.textContent = 'Please enter a valid phone number.';
        result.style.color = 'crimson';
        return;
      }

      // Business logic: if sponsor, calculate cost
      if(type === 'sponsor'){
        const parcelsEl = document.getElementById('parcels');
        const parcels = parcelsEl ? Number(parcelsEl.value) || 1 : 1;
        const costEach = 120; // ZAR
        const total = parcels * costEach;
        result.innerHTML = `Thanks ${name}. Sponsorship request received. Parcel(s): ${parcels} — Estimated cost: R${total}. We will contact you at ${email}.`;
        result.style.color = 'green';
        enquiryForm.reset();
        return;
      }

      // Volunteer or partnership confirmation
      result.textContent = `Thanks ${name}. Your enquiry as "${type}" has been received. We'll contact you at ${email}.`;
      result.style.color = 'green';
      enquiryForm.reset();
    });
  }

  // Contact form - compile into mailto
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', (ev)=>{
      ev.preventDefault();
      const name = contactForm.cname.value.trim();
      const email = contactForm.cemail.value.trim();
      const reason = contactForm.creason.value;
      const phone = contactForm.cphone.value.trim();
      const message = contactForm.cmessage.value.trim();
      const status = document.getElementById('contact-status');

      if(!name || !email || !reason || !message){
        status.textContent = 'Please complete required fields.';
        status.style.color = 'crimson';
        return;
      }
      if(!validEmail(email) || !validPhone(phone)){
        status.textContent = 'Please enter a valid email/phone.';
        status.style.color = 'crimson';
        return;
      }

      // Compile email body
      const subject = encodeURIComponent(`[BrightFutures Enquiry] ${reason}`);
      const bodyLines = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'N/A'}`,
        `Reason: ${reason}`,
        ``,
        `Message:`,
        message
      ];
      const body = encodeURIComponent(bodyLines.join('\n'));
      // Use mailto to open user's email client (assignment purpose)
      const mailto = `mailto:info@brightfutures.org?subject=${subject}&body=${body}`;
      // For demo, show preview then open mailto
      status.textContent = 'Preparing your email...';
      status.style.color = 'black';
      setTimeout(()=>{
        window.location.href = mailto;
        status.textContent = 'If your mail client did not open, copy this email address: info@brightfutures.org';
        status.style.color = 'green';
        contactForm.reset();
      }, 600);
    });
  }
});
