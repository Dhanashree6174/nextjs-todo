import { NextApiRequest, NextApiResponse } from "next";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
}

const handler = (req: NextApiRequest, res: NextApiResponse<Todo[]>) => {
  res.status(200).json([
    {id: 1, text: "Learn Next.js", completed: false},
    {id: 2, text: "Understand SSR", completed: true},
  ]);
}

export default handler