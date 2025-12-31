import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface App {
  id: string;
  name: string;
  icon: string;
  category: string;
  blocked: boolean;
}

const mockApps: App[] = [
  { id: '1', name: 'Telegram', icon: '📱', category: 'Мессенджеры', blocked: false },
  { id: '2', name: 'WhatsApp', icon: '💬', category: 'Мессенджеры', blocked: false },
  { id: '3', name: 'YouTube', icon: '📺', category: 'Видео', blocked: false },
  { id: '4', name: 'TikTok', icon: '🎵', category: 'Социальные сети', blocked: false },
  { id: '5', name: 'Instagram', icon: '📷', category: 'Социальные сети', blocked: false },
  { id: '6', name: 'Facebook', icon: '👥', category: 'Социальные сети', blocked: false },
  { id: '7', name: 'Twitter (X)', icon: '🐦', category: 'Социальные сети', blocked: false },
  { id: '8', name: 'VK', icon: '🎭', category: 'Социальные сети', blocked: false },
  { id: '9', name: 'Viber', icon: '📞', category: 'Мессенджеры', blocked: false },
  { id: '10', name: 'Skype', icon: '🎥', category: 'Мессенджеры', blocked: false },
  { id: '11', name: 'Discord', icon: '🎮', category: 'Мессенджеры', blocked: false },
  { id: '12', name: 'Signal', icon: '🔐', category: 'Мессенджеры', blocked: false },
  { id: '13', name: 'Snapchat', icon: '👻', category: 'Социальные сети', blocked: false },
  { id: '14', name: 'LinkedIn', icon: '💼', category: 'Социальные сети', blocked: false },
  { id: '15', name: 'Pinterest', icon: '📌', category: 'Социальные сети', blocked: false },
  { id: '16', name: 'Reddit', icon: '🤖', category: 'Социальные сети', blocked: false },
  { id: '17', name: 'Twitch', icon: '🎮', category: 'Видео', blocked: false },
  { id: '18', name: 'Netflix', icon: '🎬', category: 'Видео', blocked: false },
  { id: '19', name: 'Spotify', icon: '🎧', category: 'Музыка', blocked: false },
  { id: '20', name: 'Apple Music', icon: '🍎', category: 'Музыка', blocked: false },
  { id: '21', name: 'Yandex Music', icon: '🎼', category: 'Музыка', blocked: false },
  { id: '22', name: 'SoundCloud', icon: '☁️', category: 'Музыка', blocked: false },
  { id: '23', name: 'Zoom', icon: '📹', category: 'Инструменты', blocked: false },
  { id: '24', name: 'Google Meet', icon: '🎤', category: 'Инструменты', blocked: false },
  { id: '25', name: 'Microsoft Teams', icon: '👔', category: 'Инструменты', blocked: false },
  { id: '26', name: 'Slack', icon: '💬', category: 'Инструменты', blocked: false },
  { id: '27', name: 'Gmail', icon: '✉️', category: 'Инструменты', blocked: false },
  { id: '28', name: 'Outlook', icon: '📧', category: 'Инструменты', blocked: false },
  { id: '29', name: 'Google Drive', icon: '☁️', category: 'Инструменты', blocked: false },
  { id: '30', name: 'Dropbox', icon: '📦', category: 'Инструменты', blocked: false },
  { id: '31', name: 'OneDrive', icon: '💾', category: 'Инструменты', blocked: false },
  { id: '32', name: 'Yandex Disk', icon: '💿', category: 'Инструменты', blocked: false },
  { id: '33', name: 'Amazon', icon: '📦', category: 'Покупки', blocked: false },
  { id: '34', name: 'AliExpress', icon: '🛒', category: 'Покупки', blocked: false },
  { id: '35', name: 'Wildberries', icon: '🛍️', category: 'Покупки', blocked: false },
  { id: '36', name: 'Ozon', icon: '🏪', category: 'Покупки', blocked: false },
  { id: '37', name: 'Avito', icon: '🏷️', category: 'Покупки', blocked: false },
  { id: '38', name: 'Uber', icon: '🚗', category: 'Транспорт', blocked: false },
];

export default function Admin() {
  const [apps, setApps] = useState<App[]>(mockApps);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const [showBlockAnimation, setShowBlockAnimation] = useState(false);
  const [blockReason, setBlockReason] = useState('');
  const [activeTab, setActiveTab] = useState<'apps' | 'requests'>('apps');
  const { toast } = useToast();

  const handleBlockClick = (app: App) => {
    if (app.blocked) {
      toast({
        title: 'Приложение уже заблокировано',
        description: `${app.name} находится в списке заблокированных`,
        variant: 'destructive',
      });
      return;
    }
    setSelectedApp(app);
    setShowConfirmDialog(true);
  };

  const handleConfirmBlock = () => {
    setShowConfirmDialog(false);
    setShowReasonDialog(true);
  };

  const handleBlockWithReason = () => {
    if (!blockReason.trim()) {
      toast({
        title: 'Укажите причину',
        description: 'Необходимо указать причину блокировки',
        variant: 'destructive',
      });
      return;
    }

    setShowReasonDialog(false);
    setShowBlockAnimation(true);

    const audio = new Audio('data:audio/wav;base64,UklGRhYAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTAAAAA=');
    audio.play();

    setTimeout(() => {
      if (selectedApp) {
        setApps(apps.map(app => 
          app.id === selectedApp.id ? { ...app, blocked: true } : app
        ));
        setShowBlockAnimation(false);
        setBlockReason('');
        
        setTimeout(() => {
          window.location.href = '/playmarket';
        }, 500);
      }
    }, 2000);
  };

  const mockRequests = [
    { id: 1, app: 'Telegram', user: 'Иван Петров', message: 'Прошу разблокировать, нужен для работы', contact: '+7 900 123-45-67', date: '2025-12-30' },
    { id: 2, app: 'YouTube', user: 'Мария Смирнова', message: 'Использую для обучения, прошу восстановить доступ', contact: 'maria@example.com', date: '2025-12-29' },
    { id: 3, app: 'Instagram', user: 'Алексей Козлов', message: 'Необходим для бизнеса, блокировка наносит ущерб', contact: '+7 912 345-67-89', date: '2025-12-28' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Роскомнадзор</h1>
              <p className="text-sm opacity-90">Система контроля и блокировки приложений</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex gap-2">
          <Button
            variant={activeTab === 'apps' ? 'default' : 'outline'}
            onClick={() => setActiveTab('apps')}
            className="flex items-center gap-2"
          >
            <Icon name="Grid3x3" size={18} />
            Каталог приложений
          </Button>
          <Button
            variant={activeTab === 'requests' ? 'default' : 'outline'}
            onClick={() => setActiveTab('requests')}
            className="flex items-center gap-2"
          >
            <Icon name="MessageSquare" size={18} />
            Запросы на разблокировку
            <Badge variant="destructive" className="ml-1">{mockRequests.length}</Badge>
          </Button>
        </div>

        {activeTab === 'apps' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
            {apps.map(app => (
              <Card key={app.id} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="text-6xl">{app.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{app.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{app.category}</p>
                    <Badge variant={app.blocked ? 'destructive' : 'secondary'}>
                      {app.blocked ? 'Заблокировано' : 'Доступно'}
                    </Badge>
                  </div>
                  <Button
                    variant={app.blocked ? 'outline' : 'destructive'}
                    className="w-full"
                    onClick={() => handleBlockClick(app)}
                    disabled={app.blocked}
                  >
                    <Icon name={app.blocked ? 'Ban' : 'ShieldAlert'} size={18} className="mr-2" />
                    {app.blocked ? 'Заблокировано' : 'Заблокировать'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-4 animate-fade-in">
            {mockRequests.map(request => (
              <Card key={request.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{request.app}</h3>
                      <Badge variant="outline">{request.date}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-2"><strong>От:</strong> {request.user}</p>
                    <p className="text-muted-foreground mb-2"><strong>Контакт:</strong> {request.contact}</p>
                    <p className="mt-3 p-3 bg-secondary rounded-lg">{request.message}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Icon name="Check" size={18} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="X" size={18} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="AlertTriangle" size={24} className="text-destructive" />
              Подтверждение блокировки
            </DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите заблокировать приложение <strong>{selectedApp?.name}</strong>?
              Это действие ограничит доступ пользователей к данному приложению.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end mt-4">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={handleConfirmBlock}>
              Да, заблокировать
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showReasonDialog} onOpenChange={setShowReasonDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Причина блокировки</DialogTitle>
            <DialogDescription>
              Укажите официальную причину блокировки приложения {selectedApp?.name}
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Например: Нарушение законодательства РФ, распространение запрещенного контента..."
            value={blockReason}
            onChange={(e) => setBlockReason(e.target.value)}
            rows={4}
            className="mt-4"
          />
          <div className="flex gap-2 justify-end mt-4">
            <Button variant="outline" onClick={() => setShowReasonDialog(false)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={handleBlockWithReason}>
              Заблокировать
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {showBlockAnimation && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
          <div className="text-center">
            <svg width="200" height="200" viewBox="0 0 200 200" className="animate-scale-in">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#ea384c" strokeWidth="4" opacity="0.3" />
              <line
                x1="60" y1="60" x2="140" y2="140"
                stroke="#ea384c"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="100"
                className="animate-draw-cross"
              />
              <line
                x1="140" y1="60" x2="60" y2="140"
                stroke="#ea384c"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="100"
                className="animate-draw-cross"
                style={{ animationDelay: '0.3s' }}
              />
            </svg>
            <p className="text-white text-2xl font-bold mt-4">Блокировка...</p>
          </div>
        </div>
      )}
    </div>
  );
}