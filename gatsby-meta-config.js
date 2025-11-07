module.exports = {
  title: `dohyunk58 dev log`,
  description: `dohyunk58 dev log`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://dohyunk58.github.io`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `dohyunk58/dohyunk58.github.io`, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: '0', // Google Analytics Tracking ID
  author: {
    name: `김도현`,
    bio: {
      role: `개발자`,
      description: ['새로운 도전을 하는', '끊임없이 성장하는'],
      thumbnail: 'sample.png', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/dohyunk58`,
      linkedIn: `https://www.linkedin.com/in/dohyunk58/`,
      email: `hedge3x@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2025.01 ~ 2025.10',
        activity: 'Jekyll 기반 블로그 운영',
        links: {
          post: '',
          github: '',
          demo: '',
        },
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '프로젝트 제목',
        description:
          '설명',
        techStack: ['기술스택'],
        thumbnailUrl: 'blog.png',
        links: {
          post: '',
          github: '',
          demo: '',
        },
      },
    ],
  },
};
