import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface App {
  id: string;
  name: string;
  icon: string;
  category: string;
  rating: number;
  downloads: string;
}

const mockApps: Record<string, App> = {
  '1': { id: '1', name: 'Telegram', icon: '📱', category: 'Общение', rating: 4.5, downloads: '1 млрд+' },
  '2': { id: '2', name: 'WhatsApp', icon: '💬', category: 'Общение', rating: 4.3, downloads: '5 млрд+' },
  '3': { id: '3', name: 'YouTube', icon: '📺', category: 'Видео', rating: 4.4, downloads: '10 млрд+' },
  '4': { id: '4', name: 'TikTok', icon: '🎵', category: 'Развлечения', rating: 4.5, downloads: '1 млрд+' },
  '5': { id: '5', name: 'Instagram', icon: '📷', category: 'Фото', rating: 4.2, downloads: '5 млрд+' },
  '6': { id: '6', name: 'Spotify', icon: '🎧', category: 'Музыка', rating: 4.6, downloads: '500 млн+' },
  '7': { id: '7', name: 'Netflix', icon: '🎬', category: 'Развлечения', rating: 4.3, downloads: '1 млрд+' },
  '8': { id: '8', name: 'Gmail', icon: '✉️', category: 'Инструменты', rating: 4.4, downloads: '10 млрд+' },
  '9': { id: '9', name: 'Viber', icon: '📞', category: 'Общение', rating: 4.1, downloads: '1 млрд+' },
  '10': { id: '10', name: 'Skype', icon: '🎥', category: 'Общение', rating: 4.0, downloads: '1 млрд+' },
  '11': { id: '11', name: 'Discord', icon: '🎮', category: 'Общение', rating: 4.6, downloads: '500 млн+' },
  '12': { id: '12', name: 'Signal', icon: '🔐', category: 'Общение', rating: 4.5, downloads: '100 млн+' },
  '13': { id: '13', name: 'Snapchat', icon: '👻', category: 'Фото', rating: 4.1, downloads: '1 млрд+' },
  '14': { id: '14', name: 'LinkedIn', icon: '💼', category: 'Социальные сети', rating: 4.3, downloads: '500 млн+' },
  '15': { id: '15', name: 'Pinterest', icon: '📌', category: 'Социальные сети', rating: 4.5, downloads: '500 млн+' },
  '16': { id: '16', name: 'Reddit', icon: '🤖', category: 'Социальные сети', rating: 4.4, downloads: '500 млн+' },
  '17': { id: '17', name: 'Twitch', icon: '🎮', category: 'Видео', rating: 4.5, downloads: '100 млн+' },
  '18': { id: '18', name: 'Apple Music', icon: '🍎', category: 'Музыка', rating: 4.6, downloads: '500 млн+' },
  '19': { id: '19', name: 'Yandex Music', icon: '🎼', category: 'Музыка', rating: 4.4, downloads: '100 млн+' },
  '20': { id: '20', name: 'SoundCloud', icon: '☁️', category: 'Музыка', rating: 4.3, downloads: '100 млн+' },
  '21': { id: '21', name: 'Zoom', icon: '📹', category: 'Инструменты', rating: 4.2, downloads: '500 млн+' },
  '22': { id: '22', name: 'Google Meet', icon: '🎤', category: 'Инструменты', rating: 4.1, downloads: '1 млрд+' },
  '23': { id: '23', name: 'Microsoft Teams', icon: '👔', category: 'Инструменты', rating: 4.3, downloads: '500 млн+' },
  '24': { id: '24', name: 'Slack', icon: '💬', category: 'Инструменты', rating: 4.5, downloads: '100 млн+' },
  '25': { id: '25', name: 'Outlook', icon: '📧', category: 'Инструменты', rating: 4.3, downloads: '500 млн+' },
  '26': { id: '26', name: 'Google Drive', icon: '☁️', category: 'Инструменты', rating: 4.5, downloads: '5 млрд+' },
  '27': { id: '27', name: 'Dropbox', icon: '📦', category: 'Инструменты', rating: 4.4, downloads: '500 млн+' },
  '28': { id: '28', name: 'OneDrive', icon: '💾', category: 'Инструменты', rating: 4.2, downloads: '1 млрд+' },
  '29': { id: '29', name: 'Yandex Disk', icon: '💿', category: 'Инструменты', rating: 4.3, downloads: '50 млн+' },
  '30': { id: '30', name: 'Amazon', icon: '📦', category: 'Покупки', rating: 4.5, downloads: '500 млн+' },
  '31': { id: '31', name: 'AliExpress', icon: '🛒', category: 'Покупки', rating: 4.3, downloads: '500 млн+' },
  '32': { id: '32', name: 'Wildberries', icon: '🛍️', category: 'Покупки', rating: 4.5, downloads: '50 млн+' },
  '33': { id: '33', name: 'Ozon', icon: '🏪', category: 'Покупки', rating: 4.4, downloads: '50 млн+' },
  '34': { id: '34', name: 'Avito', icon: '🏷️', category: 'Покупки', rating: 4.3, downloads: '100 млн+' },
  '35': { id: '35', name: 'Uber', icon: '🚗', category: 'Транспорт', rating: 4.4, downloads: '500 млн+' },
  '36': { id: '36', name: 'Yandex Go', icon: '🚕', category: 'Транспорт', rating: 4.3, downloads: '50 млн+' },
  '37': { id: '37', name: 'Facebook', icon: '👥', category: 'Социальные сети', rating: 4.0, downloads: '5 млрд+' },
  '38': { id: '38', name: 'VK', icon: '🎭', category: 'Социальные сети', rating: 4.3, downloads: '100 млн+' },
};

export default function AppInstalled() {
  const [app, setApp] = useState<App | null>(null);
  const [isInstalling, setIsInstalling] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const appId = params.get('id');
    
    if (appId && mockApps[appId]) {
      setApp(mockApps[appId]);
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsInstalling(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleOpenApp = () => {
    alert(`Открываем ${app?.name}... (это демо-версия)`);
  };

  const handleBackToMarket = () => {
    window.location.href = '/playmarket';
  };

  if (!app) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="animate-spin mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBackToMarket}>
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h1 className="text-2xl font-bold text-green-600">Google Play</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="animate-scale-in">
          {isInstalling ? (
            <Card className="p-8 text-center">
              <div className="text-8xl mb-6 animate-pulse">{app.icon}</div>
              <h2 className="text-3xl font-bold mb-2">Установка {app.name}...</h2>
              <p className="text-muted-foreground mb-6">Пожалуйста, подождите</p>
              <Progress value={progress} className="mb-4 h-3" />
              <p className="text-sm text-muted-foreground">{progress}%</p>
            </Card>
          ) : (
            <Card className="p-8 text-center animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
                <Icon name="Check" size={48} className="text-green-600" />
              </div>
              <h2 className="text-3xl font-bold mb-2 text-green-600">Установлено!</h2>
              <div className="text-7xl my-6">{app.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{app.name}</h3>
              <p className="text-muted-foreground mb-6">{app.category}</p>
              
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center mb-1">
                    <Icon name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-lg">{app.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Рейтинг</p>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center mb-1">
                    <Icon name="Download" size={20} />
                    <span className="font-bold text-lg">{app.downloads}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Установок</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleOpenApp} 
                  className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                >
                  <Icon name="Play" size={24} className="mr-2" />
                  Открыть приложение
                </Button>
                <Button 
                  onClick={handleBackToMarket} 
                  variant="outline" 
                  className="w-full text-lg py-6"
                >
                  <Icon name="Store" size={24} className="mr-2" />
                  Вернуться в магазин
                </Button>
              </div>

              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  <Icon name="CheckCircle" size={16} className="inline mr-2" />
                  Приложение установлено и готово к использованию
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}