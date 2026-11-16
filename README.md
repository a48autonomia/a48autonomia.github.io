# A48 Autonomia

Landing page estática, sem dependências, preparada para GitHub Pages. A fonte principal está em `esboco_site/a48_autonomia_landing.html`; `tools/build.mjs` gera `dist/index.html` e copia somente os arquivos públicos necessários.

## Prévia local

Requer Node.js e, para o servidor abaixo, Python:

```powershell
node tools/build.mjs
python -m http.server 8080 --bind 127.0.0.1 --directory dist
```

Abra http://127.0.0.1:8080. O formulário permanece desabilitado até a configuração do identificador; o WhatsApp já está configurado para +55 (45) 99806-9358. Nenhum e-mail de destino fica nos arquivos públicos.

## Ativar o formulário

Serviço escolhido: [FormSubmit](https://formsubmit.co/documentation), com envio POST normal, reCAPTCHA do provedor habilitado e campo antispam `_honey`. O serviço oferece identificador público para não expor o e-mail no HTML ou JavaScript. Esse identificador é um endereço de formulário, não uma senha.

1. Acesse o [playground oficial](https://formsubmit.co/live-demo) a partir de “Try It Now” na página do FormSubmit. No ambiente do provedor, informe o e-mail de recebimento combinado nesta conversa e envie uma mensagem de ativação com dados fictícios. Não publique esse e-mail no repositório.
2. Abra a caixa de entrada (e spam), confirme a ativação e obtenha a sequência aleatória fornecida como “Invisible emails”.
3. Cole somente essa sequência em `formsubmitId`, no arquivo `esboco_site/site-config.js`. Não use o e-mail no lugar do identificador.
4. Execute `node tools/build.mjs --production`. Após publicar, faça um envio de teste e confira a chegada na caixa de entrada; passar na verificação do navegador não comprova entrega de e-mail.

O visitante preenche os dados e confirma a leitura do aviso de privacidade. O navegador abre a página do FormSubmit para concluir a verificação antispam e mostrar o resultado. A página não simula confirmação de envio e não persiste os dados localmente. Não use AJAX para contornar o desafio do provedor.

## Publicação no GitHub Pages

Repositório: [a48autonomia/a48autonomia.github.io](https://github.com/a48autonomia/a48autonomia.github.io). O GitHub Pages usa **GitHub Actions** como fonte de publicação. O fluxo publica a cada push na branch `main` e também pode ser executado em **Actions → Publicar GitHub Pages → Run workflow**. Enquanto o identificador do FormSubmit não estiver configurado, o site será publicado com o formulário desabilitado e o WhatsApp disponível.

O endereço inicial é `https://a48autonomia.github.io/`. Os caminhos relativos permitem o mesmo funcionamento no domínio próprio. O artefato publicado contém apenas os arquivos gerados em `dist/`; README e ferramentas não entram na página.

## Verificação do Google

O arquivo `esboco_site/google23011148cf338c48.html` é copiado em toda publicação para `https://a48autonomia.github.io/google23011148cf338c48.html`. Mantenha o arquivo e a etapa de cópia no build mesmo após a confirmação no Google Search Console.

## Sitemap

O build publica `esboco_site/sitemap.xml` e `esboco_site/robots.txt` na raiz do site. O sitemap lista a página principal e é referenciado pelo robots.txt. No Google Search Console, em **Sitemaps**, envie `https://a48autonomia.github.io/sitemap.xml`. Ao adotar o domínio próprio, atualize as URLs absolutas desses dois arquivos.

## Domínio próprio depois da compra

Não há CNAME configurado antecipadamente. Quando adquirir `a48autonomia.com.br`, verifique a propriedade do domínio e configure-o em Settings → Pages, seguindo a [documentação oficial do GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site). Configure os registros DNS apresentados na documentação e habilite **Enforce HTTPS** quando o certificado estiver disponível. Evite fixar IPs copiados de tutoriais antigos. O serviço de formulário pode solicitar nova confirmação ao mudar o endereço do site; teste o envio novamente.

## Aviso de privacidade

O aviso identifica os dados do pedido, uso para atendimento e proposta, fornecedores envolvidos (GitHub, FormSubmit, Gmail/Google e WhatsApp), critérios de conservação e canal para direitos dos titulares. Mantém a identificação comercial já existente no esboço: “A48 Autonomia, uma linha da Acesso 48 Tecnologia”. A razão social e os procedimentos reais de armazenamento devem ser conferidos pelo responsável antes de publicar.
