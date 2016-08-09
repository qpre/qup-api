const initialState = [
  {
    id:    3,
    title: 'Building and Deploying a Swift project to Amazon EC2 with Git',
    body:  '/assets/markdown/code-amazon-ec2-deploy-git.md',
    tags:  'code swift amazon deploy',
    cover: '/assets/images/rocket-launch.jpg',
  },

  {
    id:    2,
    title: 'Writing a web framework in Swift',
    body:  '/assets/markdown/swift-octopus.md',
    tags:  'code swift',
    cover: '/assets/images/swift.jpg',
  },

  {
    id:    1,
    title: 'Revisited Chicken Korma Recipe',
    body:  '/assets/markdown/chicken_korma.md',
    tags:  'food',
    cover: '/assets/images/IMG_0055.jpg',
  },
];

export function articles(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
