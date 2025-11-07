<template>
  <footer>
    <div>
      <strong>Copyright</strong>
      <p>&copy; 2025-{{ new Date().getFullYear() }} Felix Wrba. Alle Rechte vorbehalten.</p>
    </div>
    <div>
      <strong>Contact</strong>
      <p>E-Mail: <a href="mailto:fmwrba@gmail.com" class="link">fmwrba@gmail.com</a> Github: <a href="http://github.com/FelixWrba" target="_blank" rel="noopener noreferrer" class="link">@FelixWrba</a></p>
    </div>
  </footer>
</template>

<style>
footer {
  padding: 2em;
  background-color: var(--color-bg-mute);
  color: var(--color-text-mute);
  font-size: 0.875em;
}

footer strong {
  font-weight: bolder;
}

footer a.link {
  color: var(--color-primary-hover);
}
</style>
