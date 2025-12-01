import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ListTodo, Loader2, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListTodo className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">
                Gerenciador de Tarefas
              </span>
            </div>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {user?.name || user?.email}
                  </span>
                  <Link href="/tasks">
                    <Button size="sm">Minhas Tarefas</Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={logout}>
                    Sair
                  </Button>
                </>
              ) : (
                <Button asChild size="sm">
                  <a href={getLoginUrl()}>Entrar</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Simples e Eficiente
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Organize suas tarefas de forma{" "}
              <span className="text-primary">inteligente</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Um gerenciador de tarefas moderno e responsivo para aumentar sua
              produtividade. Acesse de qualquer dispositivo, a qualquer momento.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link href="/tasks">
                  <Button size="lg" className="w-full sm:w-auto">
                    <ListTodo className="h-5 w-5 mr-2" />
                    Acessar Minhas Tarefas
                  </Button>
                </Link>
              ) : (
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a href={getLoginUrl()}>
                    Começar Gratuitamente
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Recursos Principais
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Fácil de Usar
                </h3>
                <p className="text-muted-foreground">
                  Interface intuitiva e limpa para você focar no que importa
                </p>
              </div>

              <div className="space-y-3 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Responsivo
                </h3>
                <p className="text-muted-foreground">
                  Funciona perfeitamente em desktop, tablet e celular
                </p>
              </div>

              <div className="space-y-3 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Seguro
                </h3>
                <p className="text-muted-foreground">
                  Suas tarefas são privadas e protegidas com autenticação
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Pronto para começar?
              </h2>
              <p className="text-lg text-muted-foreground">
                Crie sua conta gratuitamente e comece a organizar suas tarefas hoje mesmo.
              </p>
              <Button asChild size="lg">
                <a href={getLoginUrl()}>
                  Criar Conta Grátis
                </a>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Gerenciador de Tarefas. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
