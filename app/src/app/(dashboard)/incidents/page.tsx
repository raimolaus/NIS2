'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Spinner,
} from '@/components/ui';

interface Incident {
  id: string;
  title: string;
  description: string;
  type: 'availability' | 'integrity' | 'confidentiality' | 'authenticity';
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'new' | 'investigating' | 'contained' | 'resolved' | 'reported' | 'closed';
  discoveredAt: string;
  reportedAt: string | null;
  affectedSystems: string[];
  affectedUsers: number | null;
  dataImpact: boolean;
  crossBorder: boolean;
  earlyWarningDeadline: string | null;
  notificationDeadline: string | null;
  finalReportDeadline: string | null;
  earlyWarningSent: boolean;
  notificationSent: boolean;
  finalReportSent: boolean;
  certCaseNumber: string | null;
  reportedBy: string;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function IncidentsPage() {
  const router = useRouter();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'investigating' | 'contained' | 'resolved' | 'reported' | 'closed'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');

  useEffect(() => {
    fetchIncidents();
  }, [statusFilter, severityFilter]);

  const fetchIncidents = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (severityFilter !== 'all') params.append('severity', severityFilter);

      const response = await fetch(`/api/incidents-mock?${params}`);
      const data = await response.json();

      if (response.ok) {
        setIncidents(data.incidents);
      } else {
        console.error('Failed to fetch incidents:', data.error);
      }
    } catch (error) {
      console.error('Error fetching incidents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-red-600 text-white">Kriitiline</Badge>;
      case 'high':
        return <Badge className="bg-orange-600 text-white">Kõrge</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-600 text-white">Keskmine</Badge>;
      case 'low':
        return <Badge className="bg-blue-600 text-white">Madal</Badge>;
      default:
        return <Badge>{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-purple-600 text-white">Uus</Badge>;
      case 'investigating':
        return <Badge className="bg-blue-600 text-white">Uurimisel</Badge>;
      case 'contained':
        return <Badge className="bg-yellow-600 text-white">Piiratud</Badge>;
      case 'resolved':
        return <Badge className="bg-green-600 text-white">Lahendatud</Badge>;
      case 'reported':
        return <Badge className="bg-indigo-600 text-white">Raporteeritud</Badge>;
      case 'closed':
        return <Badge className="bg-gray-600 text-white">Suletud</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'availability':
        return <Badge variant="outline">Kättesaadavus</Badge>;
      case 'integrity':
        return <Badge variant="outline">Terviklikkus</Badge>;
      case 'confidentiality':
        return <Badge variant="outline">Konfidentsiaalsus</Badge>;
      case 'authenticity':
        return <Badge variant="outline">Autentsus</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('et-EE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getDeadlineStatus = (deadline: string | null) => {
    if (!deadline) return null;

    const now = new Date();
    const deadlineDate = new Date(deadline);
    const hoursRemaining = (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursRemaining < 0) {
      return { text: 'Tähtaeg möödas', color: 'text-red-600', urgent: true };
    } else if (hoursRemaining < 6) {
      return { text: `${Math.round(hoursRemaining)}h jäänud`, color: 'text-orange-600', urgent: true };
    } else if (hoursRemaining < 24) {
      return { text: `${Math.round(hoursRemaining)}h jäänud`, color: 'text-yellow-600', urgent: false };
    } else {
      const daysRemaining = Math.round(hoursRemaining / 24);
      return { text: `${daysRemaining}p jäänud`, color: 'text-gray-600', urgent: false };
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Turvainsidendid</h1>
          <p className="text-muted-foreground mt-2">
            NIS2 direktiivi kohaselt registreeritud turvaolukorra rikkumised
          </p>
        </div>
        <Button onClick={() => router.push('/incidents/new')}>
          🚨 Registreeri uus intsident
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-6 flex-wrap">
            <div>
              <label className="text-sm font-medium mb-2 block">Olek:</label>
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('all')}
                >
                  Kõik
                </Button>
                <Button
                  size="sm"
                  variant={statusFilter === 'new' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('new')}
                >
                  Uus
                </Button>
                <Button
                  size="sm"
                  variant={statusFilter === 'investigating' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('investigating')}
                >
                  Uurimisel
                </Button>
                <Button
                  size="sm"
                  variant={statusFilter === 'contained' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('contained')}
                >
                  Piiratud
                </Button>
                <Button
                  size="sm"
                  variant={statusFilter === 'resolved' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('resolved')}
                >
                  Lahendatud
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Raskusaste:</label>
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant={severityFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setSeverityFilter('all')}
                >
                  Kõik
                </Button>
                <Button
                  size="sm"
                  variant={severityFilter === 'critical' ? 'default' : 'outline'}
                  onClick={() => setSeverityFilter('critical')}
                >
                  Kriitiline
                </Button>
                <Button
                  size="sm"
                  variant={severityFilter === 'high' ? 'default' : 'outline'}
                  onClick={() => setSeverityFilter('high')}
                >
                  Kõrge
                </Button>
                <Button
                  size="sm"
                  variant={severityFilter === 'medium' ? 'default' : 'outline'}
                  onClick={() => setSeverityFilter('medium')}
                >
                  Keskmine
                </Button>
                <Button
                  size="sm"
                  variant={severityFilter === 'low' ? 'default' : 'outline'}
                  onClick={() => setSeverityFilter('low')}
                >
                  Madal
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Incidents List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Spinner className="h-8 w-8" />
        </div>
      ) : incidents.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="text-muted-foreground">
              <svg
                className="mx-auto h-12 w-12 mb-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg font-medium">Intsidente ei leitud</p>
              <p className="text-sm mt-2">
                {statusFilter !== 'all' || severityFilter !== 'all'
                  ? 'Proovi muuta filtreid või registreeri uus intsident'
                  : 'Alusta esimese turvaolukorra rikkumise registreerimisega'}
              </p>
              <Button
                className="mt-4"
                onClick={() => router.push('/incidents/new')}
              >
                🚨 Registreeri intsident
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {incidents.map((incident) => {
            const nextDeadline = incident.earlyWarningDeadline && !incident.earlyWarningSent
              ? { type: 'Varajane hoiatus', deadline: incident.earlyWarningDeadline }
              : incident.notificationDeadline && !incident.notificationSent
              ? { type: 'Intsidenditeatatis', deadline: incident.notificationDeadline }
              : incident.finalReportDeadline && !incident.finalReportSent
              ? { type: 'Lõpparuanne', deadline: incident.finalReportDeadline }
              : null;

            const deadlineStatus = nextDeadline ? getDeadlineStatus(nextDeadline.deadline) : null;

            return (
              <Card key={incident.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push(`/incidents/${incident.id}`)}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{incident.title}</CardTitle>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {getSeverityBadge(incident.severity)}
                        {getStatusBadge(incident.status)}
                        {getTypeBadge(incident.type)}
                        {incident.dataImpact && (
                          <Badge variant="outline" className="border-red-300 text-red-700">
                            Andmeleke
                          </Badge>
                        )}
                        {incident.crossBorder && (
                          <Badge variant="outline" className="border-orange-300 text-orange-700">
                            Piiriülene
                          </Badge>
                        )}
                        {incident.certCaseNumber && (
                          <Badge variant="outline" className="border-blue-300 text-blue-700">
                            CERT: {incident.certCaseNumber}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {nextDeadline && deadlineStatus && (
                      <div className={`text-right ${deadlineStatus.urgent ? 'animate-pulse' : ''}`}>
                        <div className="text-xs text-muted-foreground">{nextDeadline.type}</div>
                        <div className={`text-sm font-semibold ${deadlineStatus.color}`}>
                          {deadlineStatus.text}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(nextDeadline.deadline)}
                        </div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {incident.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex gap-4">
                      <span>
                        <strong>Avastatud:</strong> {formatDate(incident.discoveredAt)}
                      </span>
                      {incident.affectedSystems.length > 0 && (
                        <span>
                          <strong>Süsteeme:</strong> {incident.affectedSystems.length}
                        </span>
                      )}
                      {incident.affectedUsers && (
                        <span>
                          <strong>Kasutajaid:</strong> {incident.affectedUsers}
                        </span>
                      )}
                    </div>
                    <span>
                      <strong>Teataja:</strong> {incident.reportedBy}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
