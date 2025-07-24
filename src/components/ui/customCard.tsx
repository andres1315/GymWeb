import { Card, CardTitle, CardHeader, CardContent } from "./card";

interface Props{
  title:string
  children: React.ReactNode
  Icon?: React.ElementType
}
export function CustomCard({title,children,Icon}:Props) {
  return (
    
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl mt-4">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          {Icon && <Icon className="h-5 w-5 text-primary"/>}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
