"use client"

import { TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"

// Dados mockados para o gráfico
const chartData = [
  { month: "Jan", tasks: 12 },
  { month: "Fev", tasks: 19 },
  { month: "Mar", tasks: 15 },
  { month: "Abr", tasks: 22 },
  { month: "Mai", tasks: 18 },
  { month: "Jun", tasks: 24 },
]

export function ChartAreaInteractive() {
  const maxTasks = Math.max(...chartData.map(d => d.tasks))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tarefas por Mês</CardTitle>
        <CardDescription>
          Acompanhe sua produtividade ao longo do tempo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Crescimento</span>
              </div>
              <span className="text-2xl font-bold text-green-600">+12%</span>
            </div>
            <div className="space-y-2">
              {chartData.map((item, index) => (
                <div key={item.month} className="flex items-center space-x-4">
                  <div className="w-8 text-sm text-muted-foreground">
                    {item.month}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(item.tasks / maxTasks) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8 text-right">
                        {item.tasks}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}