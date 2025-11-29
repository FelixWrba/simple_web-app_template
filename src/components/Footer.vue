<template>
  <footer>
    <div>
      <strong>{{ t('footer.copy') }}</strong>
      <p>&copy; 2025-{{ new Date().getFullYear() }} Felix Wrba. {{t('footer.reserved')}}</p>
    </div>
    <div>
      <strong>{{t('footer.contact')}}</strong>
      <p>E-Mail: <a href="mailto:fmwrba@gmail.com" class="link">fmwrba@gmail.com</a> GitHub: <a href="http://github.com/FelixWrba" target="_blank" rel="noopener noreferrer" class="link">@FelixWrba</a></p>
    </div>
    <div>
      <strong>{{t('footer.ressources')}}</strong>
      <ul>
        <li><a class="link" href="/">{{t('footer.landing')}}</a></li>
        <li><a class="link" href="/#imprint">{{t('footer.imprint')}}</a></li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const {t} = useI18n();
</script>

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

footer .link, footer .link:visited {
  color: var(--color-primary-hover);
}

footer ul {
  list-style-type: none;
}
</style>
