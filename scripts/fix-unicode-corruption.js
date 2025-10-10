const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'piwmx6fh',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

async function cleanUnicodeCorruption() {
  try {
    console.log('🔍 Fetching current hero section data...');
    
    // Fetch current hero section
    const heroSection = await client.fetch('*[_type == "heroSection"][0]');
    
    if (!heroSection) {
      console.log('❌ No hero section found');
      return;
    }

    console.log('📝 Current data structure:');
    console.log('Title:', heroSection.title?.substring(0, 50) + '...');
    console.log('Subtitle:', heroSection.subtitle?.substring(0, 50) + '...');
    console.log('CTA Text:', heroSection.ctaText?.substring(0, 30) + '...');
    console.log('CTA Link:', heroSection.ctaLink?.substring(0, 50) + '...');
    console.log('Slider Images Count:', heroSection.sliderImages?.length || 0);

    // Function to clean Unicode corruption
    function cleanText(text) {
      if (!text || typeof text !== 'string') return text;
      
      // Remove Unicode corruption patterns
      return text
        .replace(/​​​​‌﻿‍﻿​‍​‍‌‍﻿﻿‌﻿​‍‌‍‍‌‌‍‌﻿‌‍‍‌‌‍﻿‍​‍​‍​﻿‍‍​‍​‍‌﻿​﻿‌‍​‌‌‍﻿‍‌‍‍‌‌﻿‌​‌﻿‍‌​‍﻿‍‌‍‍‌‌‍﻿﻿​‍​‍​‍﻿​​‍​‍‌‍‍​‌﻿​‍‌‍‌‌‌‍‌‍​‍​‍​﻿‍‍​‍​‍‌‍‍​‌﻿‌​‌﻿‌​‌﻿​​‌﻿​﻿​﻿‍‍​‍﻿﻿​‍﻿﻿‌﻿​​‌‍‍‌‌﻿‌﻿‌‍﻿‌‌﻿‍​​﻿‌‍‌‍‌‍‌‍‍​​‍﻿‍‌﻿​﻿‌‍​‌‌‍﻿‍‌‍‍‌‌﻿‌​‌﻿‍‌​‍﻿‍‌﻿​﻿‌﻿‌​‌﻿‌‌‌‍‌​‌‍‍‌‌‍﻿﻿​‍﻿﻿‌‍‍‌‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​​‍﻿﻿‌‍‌‌‌‍‌​‌‍‍‌‌﻿‌​​‍﻿﻿‌‍﻿‌‌‍﻿﻿‌‍‌​‌‍‌‌​﻿﻿‌‌﻿​​‌﻿​‍‌‍‌‌‌﻿​﻿‌‍‌‌‌‍﻿‍‌﻿‌​‌‍​‌‌﻿‌​‌‍‍‌‌‍﻿﻿‌‍﻿‍​﻿‍﻿‌‍‍‌‌‍‌​​﻿﻿‌‌‍‍​‌‍‌‌‌﻿​‍‌‍﻿﻿‌‌​﻿‌‍‌‌‌‍​﻿‌﻿‌​‌‍‍‌‌‍﻿﻿‌‍﻿‍​﻿‍﻿‌﻿‌​‌﻿‍‌‌﻿​​‌‍‌‌​﻿﻿‌‌‍‍​‌‍‌‌‌﻿​‍‌‍﻿﻿‌‌​﻿‌‍‌‌‌‍​﻿‌﻿‌​‌‍‍‌‌‍﻿﻿‌‍﻿‍​﻿‍﻿‌﻿​​‌‍​‌‌﻿‌​‌‍‍​​﻿﻿‌‌﻿​﻿‌‍﻿​‌‍‍‌‌‍‌​‌‍‌‌‌﻿​‍‌​‍‌‌‍﻿‌‌‍​‌‌‍‌﻿‌‍‌‌‌﻿​﻿​‍‌‌​﻿‌‌‌​​‍‌‌﻿﻿‌‍‍﻿‌‍‌‌‌﻿‍‌​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​‍​﻿​‍​﻿‌﻿​﻿‍​​﻿​‍​﻿‍‌​﻿​‌​﻿‍‌‌‍‌‍‌‍​﻿‌‍‌‍​﻿​﻿​﻿‍​‌‍​‌​‍‌‌​﻿​‍​﻿​‍​‍‌‌​﻿‌‌‌​‌​​‍﻿‍‌‍​‌‌‍﻿​‌﻿‌​​﻿﻿﻿‌‍​‍‌‍​‌‌﻿​﻿‌‍‌‌‌‌‌‌‌﻿​‍‌‍﻿​​﻿﻿‌‌‍‍​‌﻿‌​‌﻿‌​‌﻿​​‌﻿​﻿​‍‌‌​﻿​﻿‌​​‌​‍‌‌​﻿​‍‌​‌‍​‍‌‌​﻿​‍‌​‌‍‌﻿​​‌‍‍‌‌﻿‌﻿‌‍﻿‌‌﻿‍​​﻿‌‍‌‍‌‍‌‍‍​​‍﻿‍‌﻿​﻿‌‍​‌‌‍﻿‍‌‍‍‌‌﻿‌​‌﻿‍‌​‍﻿‍‌﻿​﻿‌﻿‌​‌﻿‌‌‌‍‌​‌‍‍‌‌‍﻿﻿​‍‌‍‌‍‍‌‌‍‌​​﻿﻿‌‌‍‍​‌‍‌‌‌﻿​‍‌‍﻿﻿‌‌​﻿‌‍‌‌‌‍​﻿‌﻿‌​‌‍‍‌‌‍﻿﻿‌‍﻿‍​‍‌‍‌﻿‌​‌﻿‍‌‌﻿​​‌‍‌‌​﻿﻿‌‌‍‍​‌‍‌‌‌﻿​‍‌‍﻿﻿‌‌​﻿‌‍‌‌‌‍​﻿‌﻿‌​‌‍‍‌‌‍﻿﻿‌‍﻿‍​‍‌‍‌﻿​​‌‍​‌‌﻿‌​‌‍‍​​﻿﻿‌‌﻿​﻿‌‍﻿​‌‍‍‌‌‍‌​‌‍‌‌‌﻿​‍‌​‍‌‌‍﻿‌‌‍​‌‌‍‌﻿‌‍‌‌‌﻿​﻿​‍‌‌​﻿‌‌‌​​‍‌‌﻿﻿‌‍‍﻿‌‍‌‌‌﻿‍‌​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​‍​﻿​‍​﻿‌﻿​﻿‍​​﻿​‍​﻿‍‌​﻿​‌​﻿‍‌‌‍‌‍‌‍​﻿‌‍‌‍​﻿​﻿​﻿‍​‌‍​‌​‍‌‌​﻿​‍​﻿​‍​‍‌‌​﻿‌‌‌​‌​​‍﻿‍‌‍​﻿‌‍​‌‌﻿​​‌﻿‌​‌‍‍‌‌‍﻿﻿‌‍﻿‍​‍‌‍‌﻿​​‌‍‌‌‌﻿​‍‌﻿​﻿‌﻿​​‌‍‌‌‌‍​﻿‌﻿‌​‌‍‍‌‌﻿‌‍‌‍‌‌​﻿﻿‌‌﻿​​‌﻿‌‌‌‍​‍‌‍﻿​‌‍‍‌‌﻿​﻿‌‍‍​‌‍‌‌‌‍‌​​‍​‍‌﻿﻿‌/g, '')
        .replace(/[​‌‍﻿]/g, '') // Remove any remaining zero-width characters
        .trim();
    }

    // Clean the data
    const cleanedData = {
      _id: heroSection._id,
      _type: 'heroSection',
      title: cleanText(heroSection.title) || 'Mahabbatussholihin Tour & Travel',
      subtitle: cleanText(heroSection.subtitle) || 'Mendampingi Jamaah Haji dan Umroh, InsyaAllah Amanah dalam memberangkatkan para Jamaah ke tanah suci',
      ctaText: cleanText(heroSection.ctaText) || 'Info lebih lanjut',
      ctaLink: cleanText(heroSection.ctaLink) || 'https://wa.me/6287770005801',
      isActive: heroSection.isActive,
      backgroundImage: heroSection.backgroundImage,
      sliderImages: heroSection.sliderImages?.map(img => ({
        ...img,
        alt: cleanText(img.alt) || '',
        caption: cleanText(img.caption) || '',
        title: cleanText(img.title) || '',
        subtitle: cleanText(img.subtitle) || ''
      })) || [],
      sliderSettings: heroSection.sliderSettings || {
        autoPlay: true,
        autoPlayInterval: 5000,
        showDots: true,
        showArrows: true,
        pauseOnHover: true
      }
    };

    console.log('🧹 Cleaned data preview:');
    console.log('Title:', cleanedData.title);
    console.log('Subtitle:', cleanedData.subtitle.substring(0, 100) + '...');
    console.log('CTA Text:', cleanedData.ctaText);
    console.log('CTA Link:', cleanedData.ctaLink);
    console.log('Slider Images Count:', cleanedData.sliderImages.length);

    // Update the document
    console.log('💾 Updating hero section with cleaned data...');
    const result = await client
      .patch(heroSection._id)
      .set(cleanedData)
      .commit();

    console.log('✅ Hero section updated successfully!');
    console.log('Updated document ID:', result._id);
    
    return result;
  } catch (error) {
    console.error('❌ Error cleaning Unicode corruption:', error);
    throw error;
  }
}

// Run the cleaning function
cleanUnicodeCorruption()
  .then(() => {
    console.log('🎉 Unicode corruption cleaning completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Failed to clean Unicode corruption:', error);
    process.exit(1);
  });