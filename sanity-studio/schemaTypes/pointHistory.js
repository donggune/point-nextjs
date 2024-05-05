export default {
  name: 'pointHistory',
  title: 'Point History',
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
    {
      name: 'transactionType',
      title: 'Transaction Type',
      type: 'string',
      options: {
        list: [
          {title: 'deposit', value: 'deposit'},
          {title: 'withdraw', value: 'withdraw'},
        ],
      },
    },
  ],
  preview: {
    select: {
      user: 'user.username',
      points: 'points',
      transactionType: 'transactionType',
    },
    prepare: ({user, points, transactionType}) => ({
      title: `${user} - ${transactionType}`,
      subtitle: `${points} points`,
    }),
  },
}
