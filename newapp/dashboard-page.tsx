"use client"

import { useState } from "react"
import {
  BarChart3,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  LayoutDashboard,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { RevenueChart } from "@/components/revenue-chart"
import { SalesChart } from "@/components/sales-chart"
import { RecentSales } from "@/components/recent-sales"

export function DashboardPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:hidden">
              <nav className="grid gap-6 text-lg font-medium">
                <a href="#" className="flex items-center gap-2 text-lg font-semibold">
                  <BarChart3 className="h-6 w-6" />
                  <span className="sr-only sm:not-sr-only sm:inline">Dashboard</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground">
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground">
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground">
                  <Package className="h-5 w-5" />
                  Products
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  Customers
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground">
                  <CreditCard className="h-5 w-5" />
                  Billing
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground">
                  <Settings className="h-5 w-5" />
                  Settings
                </a>
              </nav>
            </SheetContent>
          </Sheet>
          <a href="#" className="flex items-center gap-2 text-lg font-semibold">
            <BarChart3 className="h-6 w-6" />
            <span className="sr-only sm:not-sr-only sm:inline">Dashboard</span>
          </a>
          <div className="relative ml-auto flex-1 sm:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </header>
        <div className="grid flex-1 gap-4 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <nav className="hidden border-r bg-background sm:block">
            <div className="flex h-full flex-col gap-2 p-4">
              <a href="#" className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary">
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <ShoppingCart className="h-5 w-5" />
                Orders
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
                Products
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Users className="h-5 w-5" />
                Customers
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <CreditCard className="h-5 w-5" />
                Billing
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Settings className="h-5 w-5" />
                Settings
              </a>
            </div>
          </nav>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">+201 since last hour</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <RevenueChart />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>You made 265 sales this month.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <SalesChart />
                </CardContent>
              </Card>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>You have 12 pending orders to process.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Order #{(1000 + i).toString()}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="ml-auto font-medium">${(99.99 * (i + 1)).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

