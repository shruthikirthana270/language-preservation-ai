"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, TrendingUp, Users, Globe, Database, MessageCircle, Calendar } from "lucide-react"
import Link from "next/link"

const languageStats = [
  { language: "Hindi", native: "हिन्दी", users: 15420, growth: 12.5, dataPoints: 45892 },
  { language: "Bengali", native: "বাংলা", users: 8930, growth: 8.3, dataPoints: 32156 },
  { language: "Telugu", native: "తెలుగు", users: 6780, growth: 15.2, dataPoints: 28934 },
  { language: "Tamil", native: "தமிழ்", users: 5640, growth: 10.7, dataPoints: 25678 },
  { language: "Marathi", native: "मराठी", users: 4320, growth: 6.9, dataPoints: 18456 },
  { language: "Gujarati", native: "ગુજરાતી", users: 3210, growth: 9.4, dataPoints: 15234 },
]

const usageMetrics = [
  { metric: "Total Conversations", value: "1.2M+", change: "+23%", icon: MessageCircle },
  { metric: "Active Users", value: "45.6K", change: "+15%", icon: Users },
  { metric: "Data Samples", value: "180K+", change: "+31%", icon: Database },
  { metric: "Languages Supported", value: "12", change: "+2", icon: Globe },
]

const monthlyData = [
  { month: "Jan", conversations: 85000, users: 3200, dataPoints: 12000 },
  { month: "Feb", conversations: 92000, users: 3800, dataPoints: 15000 },
  { month: "Mar", conversations: 108000, users: 4200, dataPoints: 18000 },
  { month: "Apr", conversations: 125000, users: 4800, dataPoints: 22000 },
  { month: "May", conversations: 142000, users: 5400, dataPoints: 28000 },
  { month: "Jun", conversations: 158000, users: 6100, dataPoints: 35000 },
]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
                <h1 className="text-xl font-bold">Language Analytics</h1>
              </div>
            </div>
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
              <Calendar className="h-3 w-3 mr-1" />
              Last updated: Today
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {usageMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.metric}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                  <metric.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="mt-4">
                  <Badge
                    variant="secondary"
                    className={`${
                      metric.change.startsWith("+") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {metric.change} from last month
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="languages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="languages">Language Performance</TabsTrigger>
            <TabsTrigger value="trends">Usage Trends</TabsTrigger>
            <TabsTrigger value="preservation">Preservation Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="languages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Language Usage Statistics</CardTitle>
                <CardDescription>Performance metrics for each supported language</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {languageStats.map((lang, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{lang.native}</h3>
                          <Badge variant="outline">{lang.language}</Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{lang.users.toLocaleString()} users</p>
                          <p className="text-xs text-gray-500">{lang.dataPoints.toLocaleString()} data points</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>User Growth</span>
                          <span className="text-green-600">+{lang.growth}%</span>
                        </div>
                        <Progress value={lang.growth * 5} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Conversations</CardTitle>
                  <CardDescription>Total conversations processed each month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{data.month}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{ width: `${(data.conversations / 160000) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{(data.conversations / 1000).toFixed(0)}K</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Active users joining the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{data.month}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${(data.users / 6500) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{(data.users / 1000).toFixed(1)}K</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Data Collection Progress</CardTitle>
                <CardDescription>Monthly data samples contributed by the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-6 gap-4">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {(data.dataPoints / 1000).toFixed(0)}K
                      </div>
                      <div className="text-sm text-gray-600">{data.month}</div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                        <div
                          className="bg-purple-600 h-1 rounded-full"
                          style={{ width: `${(data.dataPoints / 35000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preservation" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cultural Content Archive</CardTitle>
                  <CardDescription>Preserved cultural knowledge by category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Folk Stories</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={75} className="w-24 h-2" />
                      <span className="text-sm font-medium">1,247</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Traditional Recipes</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={60} className="w-24 h-2" />
                      <span className="text-sm font-medium">892</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Proverbs & Sayings</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={45} className="w-24 h-2" />
                      <span className="text-sm font-medium">567</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Traditional Songs</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={35} className="w-24 h-2" />
                      <span className="text-sm font-medium">234</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Festival Descriptions</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={55} className="w-24 h-2" />
                      <span className="text-sm font-medium">445</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Language Preservation Status</CardTitle>
                  <CardDescription>Conservation efforts for endangered languages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm">Maithili</h4>
                        <p className="text-xs text-gray-500">13M+ speakers</p>
                      </div>
                      <Badge variant="destructive" className="bg-red-100 text-red-800">
                        Critical
                      </Badge>
                    </div>
                    <Progress value={15} className="h-2" />
                    <p className="text-xs text-gray-600">234 data samples collected</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm">Assamese</h4>
                        <p className="text-xs text-gray-500">15M+ speakers</p>
                      </div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Developing
                      </Badge>
                    </div>
                    <Progress value={35} className="h-2" />
                    <p className="text-xs text-gray-600">567 data samples collected</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm">Odia</h4>
                        <p className="text-xs text-gray-500">38M+ speakers</p>
                      </div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Developing
                      </Badge>
                    </div>
                    <Progress value={42} className="h-2" />
                    <p className="text-xs text-gray-600">892 data samples collected</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Community Impact</CardTitle>
                <CardDescription>Measuring the social impact of language preservation efforts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">3,384</div>
                    <div className="text-sm text-gray-600">Cultural Stories Preserved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">1,247</div>
                    <div className="text-sm text-gray-600">Active Contributors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">89%</div>
                    <div className="text-sm text-gray-600">User Satisfaction Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
