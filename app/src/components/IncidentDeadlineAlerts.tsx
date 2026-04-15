'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from '@/components/ui';

interface Incident {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  earlyWarningDeadline: string | null;
  notificationDeadline: string | null;
  finalReportDeadline: string | null;
  earlyWarningSent: boolean;
  notificationSent: boolean;
  finalReportSent: boolean;
}

interface DeadlineAlert {
  incidentId: string;
  incidentTitle: string;
  severity: string;
  deadlineType: string;
  deadline: string;
  hoursRemaining: number;
  urgent: boolean;
}

export function IncidentDeadlineAlerts() {
  const [alerts, setAlerts] = useState<DeadlineAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeadlines();
  }, []);

  const fetchDeadlines = async () => {
    try {
      const response = await fetch('/api/incidents-mock');
      const data = await response.json();

      if (response.ok) {
        const now = new Date();
        const deadlineAlerts: DeadlineAlert[] = [];

        data.incidents.forEach((incident: Incident) => {
          // Check early warning deadline
          if (incident.earlyWarningDeadline && !incident.earlyWarningSent) {
            const deadline = new Date(incident.earlyWarningDeadline);
            const hoursRemaining = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

            if (hoursRemaining <= 48) {
              // Show alerts for deadlines within 48 hours
              deadlineAlerts.push({
                incidentId: incident.id,
                incidentTitle: incident.title,
                severity: incident.severity,
                deadlineType: 'Varajane hoiatus',
                deadline: incident.earlyWarningDeadline,
                hoursRemaining,
                urgent: hoursRemaining < 6,
              });
            }
          }

          // Check notification deadline
          if (incident.notificationDeadline && !incident.notificationSent) {
            const deadline = new Date(incident.notificationDeadline);
            const hoursRemaining = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

            if (hoursRemaining <= 48) {
              deadlineAlerts.push({
                incidentId: incident.id,
                incidentTitle: incident.title,
                severity: incident.severity,
                deadlineType: 'Intsidenditeatatis',
                deadline: incident.notificationDeadline,
                hoursRemaining,
                urgent: hoursRemaining < 12,
              });
            }
          }

          // Check final report deadline
          if (incident.finalReportDeadline && !incident.finalReportSent) {
            const deadline = new Date(incident.finalReportDeadline);
            const hoursRemaining = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

            if (hoursRemaining <= 7 * 24) {
              // Show final report alerts within 7 days
              deadlineAlerts.push({
                incidentId: incident.id,
                incidentTitle: incident.title,
                severity: incident.severity,
                deadlineType: 'Lõpparuanne',
                deadline: incident.finalReportDeadline,
                hoursRemaining,
                urgent: hoursRemaining < 48,
              });
            }
          }
        });

        // Sort by urgency and time remaining
        deadlineAlerts.sort((a, b) => {
          if (a.urgent && !b.urgent) return -1;
          if (!a.urgent && b.urgent) return 1;
          return a.hoursRemaining - b.hoursRemaining;
        });

        setAlerts(deadlineAlerts);
      }
    } catch (error) {
      console.error('Error fetching deadlines:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeRemaining = (hours: number) => {
    if (hours < 0) {
      return { text: 'Tähtaeg möödas!', color: 'text-red-600' };
    } else if (hours < 1) {
      const minutes = Math.round(hours * 60);
      return { text: `${minutes} minutit jäänud`, color: 'text-red-600' };
    } else if (hours < 24) {
      return { text: `${Math.round(hours)}h jäänud`, color: hours < 6 ? 'text-red-600' : 'text-orange-600' };
    } else {
      const days = Math.round(hours / 24);
      return { text: `${days}p jäänud`, color: days < 2 ? 'text-orange-600' : 'text-yellow-600' };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('et-EE', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-red-600 text-white text-xs">Kriitiline</Badge>;
      case 'high':
        return <Badge className="bg-orange-600 text-white text-xs">Kõrge</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-600 text-white text-xs">Keskmine</Badge>;
      case 'low':
        return <Badge className="bg-blue-600 text-white text-xs">Madal</Badge>;
      default:
        return <Badge className="text-xs">{severity}</Badge>;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔔 NIS2 Raporteerimise tähtajad
          </CardTitle>
          <CardDescription>Laadin...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (alerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔔 NIS2 Raporteerimise tähtajad
          </CardTitle>
          <CardDescription>Lähenevad CERT.EE raporti tähtajad</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-sm text-muted-foreground py-4">
            ✓ Pole lähenevaid tähtaegu
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={alerts.some(a => a.urgent) ? 'border-red-300' : ''}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {alerts.some(a => a.urgent) ? '🚨' : '🔔'} NIS2 Raporteerimise tähtajad
            </CardTitle>
            <CardDescription>Lähenevad CERT.EE raporti tähtajad</CardDescription>
          </div>
          {alerts.some(a => a.urgent) && (
            <Badge className="bg-red-600 text-white animate-pulse">
              {alerts.filter(a => a.urgent).length} Kiireloomuline
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert, index) => {
            const timeInfo = formatTimeRemaining(alert.hoursRemaining);
            return (
              <Link
                key={`${alert.incidentId}-${alert.deadlineType}-${index}`}
                href={`/incidents/${alert.incidentId}`}
                className={`block p-3 rounded-md border transition-all hover:shadow-md ${
                  alert.urgent
                    ? 'bg-red-50 border-red-200 hover:bg-red-100'
                    : alert.hoursRemaining < 24
                    ? 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                    : 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getSeverityBadge(alert.severity)}
                      <span className="text-xs font-medium text-muted-foreground">
                        {alert.deadlineType}
                      </span>
                    </div>
                    <p className="text-sm font-medium truncate">{alert.incidentTitle}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tähtaeg: {formatDate(alert.deadline)}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-sm font-semibold ${timeInfo.color} ${alert.urgent ? 'animate-pulse' : ''}`}>
                      {timeInfo.text}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-4 pt-3 border-t">
          <Link href="/incidents" className="text-sm text-primary hover:underline">
            Vaata kõiki intsidente →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
