export default {
  name: 'point',
  title: 'Point',
  type: 'document',
  fields: [
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      name: 'points',
      title: 'Points',
      type: 'number',
    },
  ],
}
