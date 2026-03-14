import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { useTranslation } from "react-i18next";

// Mock data for submissions
const mockSubmissions = [
  {
    id: 1,
    type: "brand",
    name: "Marlboro",
    region: "United States",
    description: "Popular American cigarette brand",
    email: "user1@example.com",
    date: "2026-03-08",
    status: "pending"
  },
  {
    id: 2,
    type: "product",
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
    type: "manufacturer",
    name: "Philip Morris International",
    country: "United States",
    website: "https://www.pmi.com",
    email: "user3@example.com",
    date: "2026-03-06",
    status: "approved"
  }
];

const AdminDashboard = () => {
  const { t } = useTranslation('dashboard');
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
                <CardTitle>{t('title')}</CardTitle>
                <CardDescription>{t('description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    📋 {t('pending')} ({pendingSubmissions.length})
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    ✅ {t('approved')} ({approvedSubmissions.length})
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    ❌ {t('rejected')} ({rejectedSubmissions.length})
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="pending" className="w-full">
              <TabsList>
                <TabsTrigger value="pending">{t('pending')}</TabsTrigger>
                <TabsTrigger value="approved">{t('approved')}</TabsTrigger>
                <TabsTrigger value="rejected">{t('rejected')}</TabsTrigger>
              </TabsList>

              <TabsContent value="pending">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('pendingSubmissions')}</CardTitle>
                    <CardDescription>{t('pendingDesc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('type')}</TableHead>
                          <TableHead>{t('name')}</TableHead>
                          <TableHead>{t('submitter')}</TableHead>
                          <TableHead>{t('date')}</TableHead>
                          <TableHead>{t('actions')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingSubmissions.map((submission) => (
                          <TableRow key={submission.id}>
                            <TableCell>
                              <Badge variant="secondary">{t(`submissionTypes.${submission.type}`)}</Badge>
                            </TableCell>
                            <TableCell>{submission.name}</TableCell>
                            <TableCell>{submission.email}</TableCell>
                            <TableCell>{submission.date}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => handleApprove(submission.id)}>
                                  {t('approve')}
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleReject(submission.id)}>
                                  {t('reject')}
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleEdit(submission.id)}>
                                  {t('common:edit')}
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
                    <CardTitle>{t('approvedSubmissions')}</CardTitle>
                    <CardDescription>{t('approvedDesc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('type')}</TableHead>
                          <TableHead>{t('name')}</TableHead>
                          <TableHead>{t('submitter')}</TableHead>
                          <TableHead>{t('date')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {approvedSubmissions.map((submission) => (
                          <TableRow key={submission.id}>
                            <TableCell>
                              <Badge variant="secondary">{t(`submissionTypes.${submission.type}`)}</Badge>
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
                    <CardTitle>{t('rejectedSubmissions')}</CardTitle>
                    <CardDescription>{t('rejectedDesc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('type')}</TableHead>
                          <TableHead>{t('name')}</TableHead>
                          <TableHead>{t('submitter')}</TableHead>
                          <TableHead>{t('date')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rejectedSubmissions.map((submission) => (
                          <TableRow key={submission.id}>
                            <TableCell>
                              <Badge variant="secondary">{t(`submissionTypes.${submission.type}`)}</Badge>
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
