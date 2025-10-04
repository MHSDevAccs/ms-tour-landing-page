const { createClient } = require('next-sanity')

const client = createClient({
  projectId: 'piwmx6fh',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function verifyContactInfo() {
  try {
    console.log('🔍 Verifying current contact information...')
    
    const siteSettings = await client.fetch(`
      *[_type == "siteSettings"][0] {
        _id,
        _updatedAt,
        contactInfo {
          phone,
          email,
          address,
          whatsapp
        }
      }
    `)
    
    console.log('\n📊 Current Data:')
    console.log('Document ID:', siteSettings?._id)
    console.log('Last Updated:', siteSettings?._updatedAt)
    
    console.log('\n📞 Contact Information:')
    console.log('Phone:', siteSettings?.contactInfo?.phone)
    console.log('Email:', siteSettings?.contactInfo?.email)
    console.log('Address:', siteSettings?.contactInfo?.address)
    console.log('WhatsApp:', siteSettings?.contactInfo?.whatsapp)
    
    console.log('\n✅ Expected vs Actual:')
    const expected = {
      phone: '+6287770005801',
      email: 'info@mahabbatussholihin.com',
      address: 'Bukit Duri, Jak-Sel',
      whatsapp: '+6287770005801'
    }
    
    const actual = siteSettings?.contactInfo || {}
    
    Object.keys(expected).forEach(key => {
      const isCorrect = actual[key] === expected[key]
      console.log(`${key}: ${isCorrect ? '✅' : '❌'} Expected: "${expected[key]}" | Actual: "${actual[key]}"`)
    })
    
    const allCorrect = Object.keys(expected).every(key => actual[key] === expected[key])
    
    if (allCorrect) {
      console.log('\n🎉 All contact information is correct!')
    } else {
      console.log('\n⚠️  Some contact information needs to be updated in Sanity Studio.')
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

verifyContactInfo()