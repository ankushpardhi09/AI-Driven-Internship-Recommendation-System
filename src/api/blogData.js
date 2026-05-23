export const BLOG_CATEGORIES = [
  { name: 'Career Tips', count: 15 },
  { name: 'AI & Technology', count: 10 },
  { name: 'Student Success Stories', count: 8 },
  { name: 'Employer Insights', count: 10 },
  { name: 'Industry News', count: 7 },
  { name: 'Product Updates', count: 5 },
]

const AUTHORS = [
  { name: 'Jane Doe', title: 'Career Coach' },
  { name: 'Rahul Sharma', title: 'AI Product Analyst' },
  { name: 'Maya Patel', title: 'Employer Success Lead' },
  { name: 'Arjun Verma', title: 'Talent Strategy Writer' },
]

const CATEGORY_TITLES = {
  'Career Tips': [
    '5 Skills Every Intern Should Have',
    'How to Write a Winning Resume',
    'Interview Preparation Guide',
    'Networking Tips for Interns',
    'Negotiating Your Internship Offer',
  ],
  'AI & Technology': [
    'How AI is Revolutionizing Hiring',
    'Understanding Machine Learning in Recruitment',
    'The Future of AI in HR',
    'Data Privacy in AI Hiring',
  ],
  'Student Success Stories': [
    'From Zero to Hero: My Internship Journey',
    'How I Got My Dream Internship',
    'Lessons Learned from My Summer Internship',
  ],
  'Employer Insights': [
    'Best Practices for Hiring Interns',
    'Building a Strong Internship Program',
    'How to Retain Top Talent',
    'Cost-Effective Hiring Strategies',
  ],
  'Industry News': ['Latest Trends in Internship Market'],
  'Product Updates': ['New AI Copilot Features Released'],
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function buildPosts() {
  const posts = []

  BLOG_CATEGORIES.forEach((category, catIndex) => {
    const presets = CATEGORY_TITLES[category.name] || []

    for (let i = 0; i < category.count; i += 1) {
      const title = presets[i] || `${category.name} Playbook ${i + 1}`
      const slug = slugify(`${title}-${catIndex}-${i + 1}`)
      const author = AUTHORS[(catIndex + i) % AUTHORS.length]
      const day = ((i + 3) % 27) + 1

      posts.push({
        id: `${category.name}-${i + 1}`,
        slug,
        title,
        excerpt:
          'Practical insights, frameworks, and examples to improve internship outcomes for students and employers.',
        category: category.name,
        readTime: `${5 + ((catIndex + i) % 6)} min read`,
        date: `April ${day}, 2026`,
        author,
        imageLabel: category.name,
      })
    }
  })

  return posts
}

export const BLOG_POSTS = buildPosts()
export const FEATURED_POSTS = BLOG_POSTS.slice(0, 4)

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

export function getRelatedPosts(category, currentSlug) {
  return BLOG_POSTS.filter((post) => post.category === category && post.slug !== currentSlug).slice(0, 3)
}
