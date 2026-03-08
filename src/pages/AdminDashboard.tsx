import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";

// Mock data for submissions
const mockSubmissions = [
  {
    id: 1,
    type: "Brand",
    name: "Marlboro",
    region: "United States",
    description: "Popular American cigarette brand",
    email: "user1@example.com",
    date: "2026-03-08",
    status: "pending"
  },
  {
    id: 2,
    type: "Product",
    name: "Marlboro Red",
    brand: "Marlboro",
    category: "Cigarettes",
    priceRange: "$5-10",
    email: "user2@example.com",
    date: "2026-03-07",
    status: "pending"
  },
  {
    id: 3,
    type: "Manufacturer",
    name: "Philip Morris International",
    country: "United States",
    website: "https://www.pmi.com",
    email: "user3@example.com",
    date: "2026-03-06",
    status: "approved"
  }
];

const AdminDashboard = () => {
  const [submissions] = useState(mockSubmissions);

  const handleApprove = (id: number) => {
    console.log("Approve submission:", id);
    // TODO: Implement actual approval logic
  };

  const handleReject = (id: number) => {
    console.log("Reject submission:", id);
    // TODO: Implement actual rejection logic
  };

  const handleEdit = (id: number) => {
    console.log("Edit submission:", id);
    // TODO: Implement actual edit logic
  };

  const pendingSubmissions = submissions.filter(s => s.status === "pending");
  const approvedSubmissions = submissions.filter(s => s.status === "approved");
  const rejectedSubmissions = submissions.filter(s => s.status === "rejected");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Card>
              <CardHeader>
                <CardTitle>管理面板</CardTitle>
                <CardDescription>审核用户提交的数据</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    📋 待审核 ({pendingSubmissions.length})
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    ✅ 已批准 ({approvedSubmissions.length})
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    ❌ 已拒绝 ({rejectedSubmissions.length})
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="pending" className="w-full">
              <TabsList>
                <TabsTrigger value="pending">待审核</TabsTrigger>
                <TabsTrigger value="approved">已批准</TabsTrigger>
                <TabsTrigger value="rejected">已拒绝</TabsTrigger>
              </TabsList>

              <TabsContent value="pending">
                <Card>
                  <CardHeader>
                    <CardTitle>待审核提交</CardTitle>
                    <CardDescription>需要您审核的新提交</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>类型</TableHead>
                          <TableHead>名称</TableHead>
                          <TableHead>提交者</TableHead>
                          <TableHead>日期</TableHead>
                          <TableHead>操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingSubmissions.map((submission) => (
                          <TableRow key={submission.id}>
                            <TableCell>
                              <Badge variant="secondary">{submission.type}</Badge>
                            </TableCell>
                            <TableCell>{submission.name}</TableCell>
                            <TableCell>{submission.email}</TableCell>
                            <TableCell>{submission.date}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => handleApprove(submission.id)}>
                                  批准
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleReject(submission.id)}>
                                  拒绝
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleEdit(submission.id)}>
                                  编辑
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="approved">
                <Card>
                  <CardHeader>
                    <CardTitle>已批准项目</CardTitle>
                    <CardDescription>已通过审核的数据</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>类型</TableHead>
                          <TableHead>名称</TableHead>
                          <TableHead>提交者</TableHead>
                          <TableHead>日期</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {approvedSubmissions.map((submission) => (
                          <TableRow key={submission.id}>
                            <TableCell>
                              <Badge variant="secondary">{submission.type}</Badge>
                            </TableCell>
                            <TableCell>{submission.name}</TableCell>
                            <TableCell>{submission.email}</TableCell>
                            <TableCell>{submission.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rejected">
                <Card>
                  <CardHeader>
                    <CardTitle>已拒绝项目</CardTitle>
                    <CardDescription>被拒绝的提交记录</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>类型</TableHead>
                          <TableHead>名称</TableHead>
                          <TableHead>提交者</TableHead>
                          <TableHead>日期</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rejectedSubmissions.map((submission) => (
                          <TableRow key={submission.id}>
                            <TableCell>
                              <Badge variant="secondary">{submission.type}</Badge>
                            </TableCell>
                            <TableCell>{submission.name}</TableCell>
                            <TableCell>{submission.email}</TableCell>
                            <TableCell>{submission.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default AdminDashboard;