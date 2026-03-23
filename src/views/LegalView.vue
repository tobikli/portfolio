<script setup lang="ts">
import router from '@/router'
import { information } from '@/data/information';
const returnHome = () => {
  router.push('/')
}
const lastUpdated = new Date(Date.parse("2026-03-23"));
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-4xl px-4">
      <header class="text-xl p-3">
        <div class="flex gap-3">
          <button
            class="px-2 py-0.5 text-sm hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black cursor-hover"
            @click="returnHome"
            aria-label="Go back"
          >
            <i class="pi pi-arrow-left"></i>
          </button>
          <h3>Legal Notice & Privacy Policy</h3>
        </div>
        <hr class="my-3" />
      </header>
      <ol class="list-decimal list-outside ml-6 space-y-8 pb-8 text-base leading-relaxed">
        <li>
          <h4 class="text-lg font-semibold">Imprint (Legal Disclosure)</h4>
          <p class="mt-2 font-medium">Information according to applicable EU regulations</p>
          <ul class="list-disc list-outside ml-6 mt-3 space-y-1">
            <li><span class="font-medium">Name:</span> {{ information.name }}</li>
            <li><span class="font-medium">Address:</span> -</li>
            <li><span class="font-medium">Email:</span> {{ information.mail }}</li>
          </ul>
          <p class="mt-3">
            This website is a personal portfolio created to present projects, skills, and
            professional experience.
          </p>
        </li>

        <li>
          <h4 class="text-lg font-semibold">Privacy Policy</h4>

          <ol class="list-decimal list-outside ml-6 mt-3 space-y-4">
            <li>
              <h5 class="font-semibold">General Information</h5>
              <p class="mt-1">
                The protection of your personal data is important to me. This website processes
                personal data only in accordance with applicable data protection laws, including the
                General Data Protection Regulation (GDPR).
              </p>
            </li>

            <li>
              <h5 class="font-semibold">Data Collection and Processing</h5>
              <p class="mt-1">
                When you visit this website, certain technical data may be automatically collected by
                your browser, such as:
              </p>
              <ul class="list-disc list-outside ml-6 mt-2 space-y-1">
                <li>IP address</li>
                <li>Date and time of access</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referrer URL</li>
              </ul>
              <p class="mt-2">
                This data is used solely to ensure the proper functioning and security of the
                website and is not used to identify individuals.
              </p>
            </li>

            <li>
              <h5 class="font-semibold">Contact</h5>
              <p class="mt-1">
                If you contact me via email, the information you provide will be stored for the
                purpose of processing your request. This data will not be shared with third parties
                without your consent.
              </p>
            </li>

            <li>
              <h5 class="font-semibold">Cookies</h5>
              <p class="mt-1">
                This website may use cookies to improve user experience. You can disable cookies
                through your browser settings at any time.
              </p>
            </li>

            <li>
              <h5 class="font-semibold">Your Rights</h5>
              <p class="mt-1">Under the GDPR, you have the right to:</p>
              <ul class="list-disc list-outside ml-6 mt-2 space-y-1">
                <li>Request access to your stored data</li>
                <li>Request correction or deletion of your data</li>
                <li>Restrict or object to data processing</li>
                <li>Data portability</li>
              </ul>
              <p class="mt-2">
                If you have any concerns regarding your data, you can contact me at the email
                provided above.
              </p>
            </li>
          </ol>
        </li>

        <li>
          <h4 class="text-lg font-semibold">Copyright (Own Content)</h4>
          <p class="mt-2">
            All content on this website created by me, including but not limited to:
          </p>
          <ul class="list-disc list-outside ml-6 mt-2 space-y-1">
            <li>Texts</li>
            <li>Code</li>
            <li>Designs</li>
            <li>Graphics</li>
          </ul>
          <p class="mt-2">is protected by copyright law.</p>
          <p class="mt-2">
            Any reproduction, modification, distribution, or use outside the limits of copyright
            law requires prior written permission.
          </p>
        </li>

        <li>
          <h4 class="text-lg font-semibold">Copyright (Third-Party Content)</h4>
          <p class="mt-2">
            Some images or media used on this website are subject to the copyright of their
            respective owners.
          </p>
          <p class="mt-2">Such content is used either:</p>
          <ul class="list-disc list-outside ml-6 mt-2 space-y-1">
            <li>With permission</li>
            <li>Under appropriate licenses</li>
            <li>Or in accordance with applicable legal provisions</li>
          </ul>
          <p class="mt-2">
            If you believe that any content on this website infringes your copyright, please contact
            me and the content will be reviewed and removed if necessary.
          </p>
        </li>

        <li>
          <h4 class="text-lg font-semibold">Liability for Content</h4>
          <p class="mt-2">
            The contents of this website have been created with great care. However, I cannot
            guarantee the accuracy, completeness, or timeliness of the content.
          </p>
        </li>

        <li>
          <h4 class="text-lg font-semibold">Liability for Links</h4>
          <p class="mt-2">
            This website may contain links to external websites. I have no control over the content
            of those websites and therefore cannot accept any liability for them. The respective
            provider or operator of the linked pages is always responsible for their content.
          </p>
        </li>

        <li>
          <h4 class="text-lg font-semibold">Updates</h4>
          <p class="mt-2">
            This legal notice and privacy policy may be updated from time to time to reflect legal
            or technical changes.
          </p>
          <p class="mt-2 font-medium">Last updated: {{ lastUpdated.toLocaleDateString() }}</p>
        </li>
      </ol>
    </div>
  </div>
</template>
