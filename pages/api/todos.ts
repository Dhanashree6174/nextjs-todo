
const handler = (req: any, res: any) => {
  res.status(200).json([
    {id: 1, text: "Learn Next.js", completed: false},
    {id: 2, text: "Understand SSR", completed: true},
  ]);
}

export default handler