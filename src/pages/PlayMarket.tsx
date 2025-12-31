import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

interface App {
  id: string;
  name: string;
  icon: string;
  category: string;
  rating: number;
  downloads: string;
  blocked: boolean;
}

const playMarketApps: App[] = [
  { id: '1', name: 'Telegram', icon: '📱', category: 'Общение', rating: 4.5, downloads: '1 млрд+', blocked: false },
  { id: '2', name: 'WhatsApp', icon: '💬', category: 'Общение', rating: 4.3, downloads: '5 млрд+', blocked: false },
  { id: '3', name: 'YouTube', icon: '📺', category: 'Видео', rating: 4.4, downloads: '10 млрд+', blocked: false },
  { id: '4', name: 'TikTok', icon: '🎵', category: 'Развлечения', rating: 4.5, downloads: '1 млрд+', blocked: false },
  { id: '5', name: 'Instagram', icon: '📷', category: 'Фото', rating: 4.2, downloads: '5 млрд+', blocked: false },
  { id: '6', name: 'Spotify', icon: '🎧', category: 'Музыка', rating: 4.6, downloads: '500 млн+', blocked: false },
  { id: '7', name: 'Netflix', icon: '🎬', category: 'Развлечения', rating: 4.3, downloads: '1 млрд+', blocked: false },
  { id: '8', name: 'Gmail', icon: '✉️', category: 'Инструменты', rating: 4.4, downloads: '10 млрд+', blocked: false },
  { id: '9', name: 'Viber', icon: '📞', category: 'Общение', rating: 4.1, downloads: '1 млрд+', blocked: false },
  { id: '10', name: 'Skype', icon: '🎥', category: 'Общение', rating: 4.0, downloads: '1 млрд+', blocked: false },
  { id: '11', name: 'Discord', icon: '🎮', category: 'Общение', rating: 4.6, downloads: '500 млн+', blocked: false },
  { id: '12', name: 'Signal', icon: '🔐', category: 'Общение', rating: 4.5, downloads: '100 млн+', blocked: false },
  { id: '13', name: 'Snapchat', icon: '👻', category: 'Фото', rating: 4.1, downloads: '1 млрд+', blocked: false },
  { id: '14', name: 'LinkedIn', icon: '💼', category: 'Социальные сети', rating: 4.3, downloads: '500 млн+', blocked: false },
  { id: '15', name: 'Pinterest', icon: '📌', category: 'Социальные сети', rating: 4.5, downloads: '500 млн+', blocked: false },
  { id: '16', name: 'Reddit', icon: '🤖', category: 'Социальные сети', rating: 4.4, downloads: '500 млн+', blocked: false },
  { id: '17', name: 'Twitch', icon: '🎮', category: 'Видео', rating: 4.5, downloads: '100 млн+', blocked: false },
  { id: '18', name: 'Apple Music', icon: '🍎', category: 'Музыка', rating: 4.6, downloads: '500 млн+', blocked: false },
  { id: '19', name: 'Yandex Music', icon: '🎼', category: 'Музыка', rating: 4.4, downloads: '100 млн+', blocked: false },
  { id: '20', name: 'SoundCloud', icon: '☁️', category: 'Музыка', rating: 4.3, downloads: '100 млн+', blocked: false },
  { id: '21', name: 'Zoom', icon: '📹', category: 'Инструменты', rating: 4.2, downloads: '500 млн+', blocked: false },
  { id: '22', name: 'Google Meet', icon: '🎤', category: 'Инструменты', rating: 4.1, downloads: '1 млрд+', blocked: false },
  { id: '23', name: 'Microsoft Teams', icon: '👔', category: 'Инструменты', rating: 4.3, downloads: '500 млн+', blocked: false },
  { id: '24', name: 'Slack', icon: '💬', category: 'Инструменты', rating: 4.5, downloads: '100 млн+', blocked: false },
  { id: '25', name: 'Outlook', icon: '📧', category: 'Инструменты', rating: 4.3, downloads: '500 млн+', blocked: false },
  { id: '26', name: 'Google Drive', icon: '☁️', category: 'Инструменты', rating: 4.5, downloads: '5 млрд+', blocked: false },
  { id: '27', name: 'Dropbox', icon: '📦', category: 'Инструменты', rating: 4.4, downloads: '500 млн+', blocked: false },
  { id: '28', name: 'OneDrive', icon: '💾', category: 'Инструменты', rating: 4.2, downloads: '1 млрд+', blocked: false },
  { id: '29', name: 'Yandex Disk', icon: '💿', category: 'Инструменты', rating: 4.3, downloads: '50 млн+', blocked: false },
  { id: '30', name: 'Amazon', icon: '📦', category: 'Покупки', rating: 4.5, downloads: '500 млн+', blocked: false },
  { id: '31', name: 'AliExpress', icon: '🛒', category: 'Покупки', rating: 4.3, downloads: '500 млн+', blocked: false },
  { id: '32', name: 'Wildberries', icon: '🛍️', category: 'Покупки', rating: 4.5, downloads: '50 млн+', blocked: false },
  { id: '33', name: 'Ozon', icon: '🏪', category: 'Покупки', rating: 4.4, downloads: '50 млн+', blocked: false },
  { id: '34', name: 'Avito', icon: '🏷️', category: 'Покупки', rating: 4.3, downloads: '100 млн+', blocked: false },
  { id: '35', name: 'Uber', icon: '🚗', category: 'Транспорт', rating: 4.4, downloads: '500 млн+', blocked: false },
  { id: '36', name: 'Yandex Go', icon: '🚕', category: 'Транспорт', rating: 4.3, downloads: '50 млн+', blocked: false },
  { id: '37', name: 'Facebook', icon: '👥', category: 'Социальные сети', rating: 4.0, downloads: '5 млрд+', blocked: false },
  { id: '38', name: 'VK', icon: '🎭', category: 'Социальные сети', rating: 4.3, downloads: '100 млн+', blocked: false },
];

export default function PlayMarket() {
  const [apps] = useState<App[]>(playMarketApps);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAppClick = (app: App) => {
    setSelectedApp(app);
  };

  const handleBack = () => {
    setSelectedApp(null);
  };

  const handleBackToAdmin = () => {
    window.location.href = '/';
  };

  if (selectedApp) {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleBack}>
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <h1 className="text-2xl font-bold">Google Play</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {selectedApp.blocked ? (
            <div className="animate-fade-in">
              <Alert variant="destructive" className="mb-6">
                <Icon name="ShieldAlert" size={20} />
                <AlertDescription className="ml-2">
                  <strong>Доступ к приложению ограничен</strong>
                  <p className="mt-2">
                    Данное приложение заблокировано по требованию регулирующих органов Российской Федерации.
                    Установка и использование недоступны на территории РФ.
                  </p>
                </AlertDescription>
              </Alert>

              <Card className="p-8 opacity-50 pointer-events-none">
                <div className="flex gap-6">
                  <div className="text-8xl">{selectedApp.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">{selectedApp.name}</h2>
                    <p className="text-muted-foreground mb-4">{selectedApp.category}</p>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={18} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{selectedApp.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Download" size={18} />
                        <span className="text-sm">{selectedApp.downloads}</span>
                      </div>
                    </div>
                    <Button disabled className="w-full bg-gray-400">
                      <Icon name="Ban" size={18} className="mr-2" />
                      Недоступно для установки
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="mt-8 text-center">
                <Button onClick={handleBackToAdmin} variant="outline">
                  <Icon name="ArrowLeft" size={18} className="mr-2" />
                  Вернуться в панель администратора
                </Button>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <Card className="p-8">
                <div className="flex gap-6">
                  <div className="text-8xl">{selectedApp.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">{selectedApp.name}</h2>
                    <p className="text-muted-foreground mb-4">{selectedApp.category}</p>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={18} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{selectedApp.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Download" size={18} />
                        <span className="text-sm">{selectedApp.downloads}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Icon name="Download" size={18} className="mr-2" />
                      Установить
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBackToAdmin}>
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-green-600">Google Play</h1>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск приложений и игр"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Популярные приложения</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApps.map(app => (
              <Card
                key={app.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleAppClick(app)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{app.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{app.name}</h3>
                    <p className="text-sm text-muted-foreground">{app.category}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{app.rating}</span>
                      </div>
                      {app.blocked && (
                        <Badge variant="destructive" className="text-xs">
                          <Icon name="Ban" size={12} className="mr-1" />
                          Заблокировано
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}