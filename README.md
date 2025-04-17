# Plataforma de Trabajo

![Pagina principal de la plataforma de trabajo](https://github.com/EliasPereyra/job-platform/blob/main/public/assets/imgs/workstart.png)

Una plataforma de empleo sin o con poca experiencia que abarca distintos tipos de rubros en distintas partes de Argentina. No hay necesidad de registrarse, solamente envía tu CV al correo de la empresa que te interesa. El objetivo es reducir los pasos para poder comunicarse con una empresa/lugar de trabajo y tener un contacto más directo. 

## Herramientas utilizadas

- ![Next.js][Next.js]
- ![React][React]
- ![GraphQL][GraphQL]
- ![WordPress][WordPress]
- ![WPGraphQL][WPGraphQL]
- ![ACF][ACF]
- ![Apollo][Apollo]
- ![Typescript][Typescript]
- ![Figma][Figma]
- ![Vitest][Vitest]
- ![msw][msw]

## Cómo configurar el proyecto

Este proyecto fue hecho usando la [plantilla](https://vercel.com/templates/next.js/isr-blog-nextjs-wordpress) que está disponible en Next.js. Nos provee un boilerplate que nos permite conectar con Wordpress a través de GraphQL de manera sencilla.

Necesitamos actualizar las variables de entorno y con ello procedemos a configurar nuestro sitio web de Wordpress.

Necesitas tener un sitio web en wordpress, o si no lo tienes, puedes hacerlo de forma gratuita, sin mucha configuración usando [Local WP](https://localwp.com/), disponible para Windows, Linux y MacOS.

### Configuración en Wordpress

Según nos dice la documentación de la plantilla de Next.js, tenemos que:

1. Pongas el `Site Address (URL)` al URL de tu Front-end, por ej. `http://localhost:3000`, en Settings > General
2. Asegúrate que los Permlinks sean `Post name` en Settings > Permalinks
3. Pon `Sample page` como `Static page` en Settings > Reading
4. Crea una nueva página llamado `404 not found` para que coincida con el slug `404-not-found`
5. Instala y activa los siguientes plugins en _Settings > Plugins_:
   - WPGraphQL SEO
   - Classic Editor
   - Redirection
   - WPGraphQL
   - WPGraphQL JWT Authentication
   - Yoast SEO
   - Advanced Custom Fields
   - WPGraphQL for ACF
6. Haz la instalación first-time de _Redirection_, cuando lo instalas te mostrará un mensaje para hacer la instalación
7. Configura Yoast SEO:
   - Desactiva `XML Sitemaps` en _Yoast SEO > Settings_
   - Si no cambiaste el `Site Address (URL)` antes de instalar Yoast, te pedirá que ejecutes optimizar los datos de SEO después de cambiar los permlinks
   - Genera un archivo robots.txt en Yoast SEO > Tools > File Editor
   - Modifica el robots.txt para que referencie el sitemap de `wp-sitemap.xml` a `sitemap.xml`
8. Activa `Public Introspection` en _GraphQL > Settings_
9. Agrega las siguientes constantes a `wp-config.php`. Este archivo en Local WP lo puedes acceder en el botón que te dice de abrir la carpeta contenedora del proyecto, o desde VS Code directamente:

```php
  define('HEADLESS_SECRET', 'INSERT_RANDOM_SECRET_KEY');
  define('HEADLESS_URL', 'INSERT_LOCAL_DEVELOPMENT_URL'); // http://localhost:3000 for local development
  define('GRAPHQL_JWT_AUTH_SECRET_KEY', 'INSERT_RANDOM_SECRET_KEY');
  define('GRAPHQL_JWT_AUTH_CORS_ENABLE', true);
```

10. Crea un pequeño tema personalizado, con solo 2 archivos:

- `style.css`
- `functions.php`

### Configuración de Next.js

> [!NOTE]
> Si quieres empezar un proyecto desde cero, puedes usar la [plantilla](https://vercel.com/templates/next.js/isr-blog-nextjs-wordpress) de Next.js.

1. Clona el repositorio
2. Ejecuta `pnpm i` para instalar las dependencias
3. Crea un archivo `.env` y agrega las siguientes variables:

| Nombre                               | Valor                                                                                                      | Ejemplo                  |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ------------------------ |
| `NEXT_PUBLIC_BASE_URL`               | Ingresa el URL de tu sitio web                                                                             | http://localhost:3000    |
| `NEXT_PUBLIC_WORDPRESS_API_URL`      | Ingresa el URL de tu API de Wordpress. No hace falta que agregues `/graphql` ya que en el código lo agrega | http://wp-tusitioweb.com |
| `NEXT_PUBLIC_WORDPRESS_API_HOSTNAME` | Ingresa el hostname de tu API de Wordpress sin el protocolo para tu instalación de Wordpress               | wp-tusitioweb.com        |
| `HEADLESS_SECRET`                    | Ingresa la misma clave aleatoria que generaste para tu `wp-config.php`                                     | INSERT_RANDOM_SECRET_KEY |
| `WP_USER`                            | Ingresa un nombre de usuario de Wordpress                                                                  | username                 |
| `WP_PASSWORD`                        | Ingresa una contraseña de Wordpress                                                                        | password                 |

> [!WARNING] > `WP_USER` y `WP_PASSWORD` son críticos para hacer que las previews y la redirección funcionen

> [!NOTE]
> Al ejecutar `pnpm dev` automáticamente generará los tipos de la instalación de Wordpress que definiste en tu variable de entorno: `NEXT_PUBLIC_WORDPRESS_API_URL`

### Configuración de Apollo

En este proyecto uso el repositorio [@apollo/experimental-nextjs-app-support](https://github.com/apollographql/apollo-client/tree/main/packages/apollo-experimental-nextjs-app-support) para conectar con la API de Wordpress de forma más sencilla. Es un wrapper de Apollo Client que permite hacer las peticiones directamente desde la API de Wordpress sin tener que hacer el `fetch` a la propia API.

## Tipos de TypeScript y de GraphQL

Estamos generando los tipos de TypeScript a partir del esquema provisto por Codegen.

## SEO

Estamos usando Yoast SEO para manejar el SEO en Wordpress, y luego todas las rutas solicitan el objeto de Yoast SEO, y 'parseándolo' (es decir, transformarlo) a una función dinámica `generateMetadata()`.

## Tema de Wordpress personalizado

Este código php lo provee el repo de Next.js.El `functions.php` implementa diferentes características útiles para poder usar Wordpress con Next.js:

- Configura un menú principal (el primary menu), que se busca en `Navigation.tsx`
- Reescribir los enlaces del preview y del rest para que coincida con el frontend en vez de la instalación de Wordpress
- Implementar la revalidación del tag cache cada vez que actualices una publicación en Wordpress
- Implementar los endpoints rest para la generación del sitemap

```php
  <?php
/**
 * Registra nuevos menus
 *
 * @return void
 */
add_action('init', 'register_new_menu');
function register_new_menu()
{
  register_nav_menus(
    array(
      'primary-menu' => __('Primary menu')
    )
  );
}

/**
 * Cambia la URL raíz de API REST para que use la URL Principal como la base.
 *
 * @param string $url La URL completa que incluye el esquema y la ruta.
 * @return string La URL raíz de la API REST.
 */
add_filter('rest_url', 'home_url_as_api_url');
function home_url_as_api_url($url)
{
  $url = str_replace(home_url(), site_url(), $url);
  return $url;
}

/**
 * Personaliza el botón preview en el WordPress admin.
 *
 * Esta función modifica el enlace del preview para una post apunte a una configuración de cliente headless.
 *
 * @param string  $link Enlace del preview de Wordpress original.
 * @param WP_Post $post Objeto del post actual.
 * @return string Enlace del preview headless modificado.
 */
add_filter( 'preview_post_link', 'set_headless_preview_link', 10, 2 );
function set_headless_preview_link( string $link, WP_Post $post ): string {
    // Define la ruta del preview del front-end.
  $frontendUrl = HEADLESS_URL;

    // Actualiza el enlace del preview en WordPress.
  return add_query_arg(
    [
      'secret' => HEADLESS_SECRET,
      'id' => $post->ID,
    ],
    esc_url_raw( esc_url_raw( "$frontendUrl/api/preview" ))
  );
}

add_filter( 'rest_prepare_page', 'set_headless_rest_preview_link', 10, 2 );
add_filter( 'rest_prepare_post', 'set_headless_rest_preview_link' , 10, 2 );
function set_headless_rest_preview_link( WP_REST_Response $response, WP_Post $post ): WP_REST_Response {
  // Verifica el es status del post es 'draft' y define el enlace del preview.
  if ( 'draft' === $post->post_status ) {
    $response->data['link'] = get_preview_post_link( $post );
    return $response;
  }

  // Para los posts publicados, modifica el permalink para que apunte al frontend.
  if ( 'publish' === $post->post_status ) {

    // Obtiene el permalink del post.
    $permalink = get_permalink( $post );

    // Verifica si el permalink contiene el URL del sitio.
    if ( false !== stristr( $permalink, get_site_url() ) ) {

      $frontendUrl = HEADLESS_URL;

      // Reemplaza la URL del sitio con la URL del frontend.
      $response->data['link'] = str_ireplace(
        get_site_url(),
        $frontendUrl,
        $permalink
      );
    }
  }

  return $response;
}


/**
 * Agrega la función headless_revalidate al hook de acción save_post.
 * Esta función hace una solicitud POST al endpoint api/revalidate del sitio headless con el cuerpo JSON: paths = ['/path/to/page', '/path/to/another/page'].
 * Requiere que HEADLESS_URL y HEADLESS_SECRET estén defininidos en wp-config.php.
 *
 * @param int $post_ID El ID del post que se ha guardado.
 * @return void
 */
add_action('transition_post_status', 'headless_revalidate', 10, 3);
function headless_revalidate(string $new_status, string $old_status, object $post ): void
{
  if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || ( defined( 'DOING_CRON' ) && DOING_CRON ) ) {
    return;
  }

  // Ignora los drafts y posts heredados.
  if ( ( 'draft' === $new_status && 'draft' === $old_status ) || 'inherit' === $new_status ) {
    return;
  }

  $frontendUrl = HEADLESS_URL;
  $headlessSecret = HEADLESS_SECRET;

  $data = json_encode([
    'tags'  => ['wordpress'],
  ]);

  $response = wp_remote_request("$frontendUrl/api/revalidate/", [
    'method'  => 'PUT',
    'body'    => $data,
    'headers' => [
      'X-Headless-Secret-Key' => $headlessSecret,
      'Content-Type'  => 'application/json',
    ],
  ]);

  // Verifica si la solicitud fue exitosa
  if (is_wp_error($response)) {
    // Maneja el error
    error_log($response->get_error_message());
  }
}

function wsra_get_user_inputs()
{
  $pageNo = sprintf("%d", $_GET['pageNo']);
  $perPage = sprintf("%d", $_GET['perPage']);
  // Verifica para taxonomyType de clave de array
  if (array_key_exists('taxonomyType', $_GET)) {
    $taxonomy = $_GET['taxonomyType'];
  } else {
    $taxonomy = 'category';
  }
  $postType = $_GET['postType'];
  $paged = $pageNo ? $pageNo : 1;
  $perPage = $perPage ? $perPage : 100;
  $offset = ($paged - 1) * $perPage;
  $args = array(
    'number' => $perPage,
    'offset' => $offset,
  );
  $postArgs = array(
    'posts_per_page' => $perPage,
    'post_type' => strval($postType ? $postType : 'post'),
    'paged' => $paged,
  );

  return [$args, $postArgs, $taxonomy];
}

function wsra_generate_author_api()
{
  [$args] = wsra_get_user_inputs();
  $author_urls = array();
  $authors =  get_users($args);
  foreach ($authors as $author) {
    $fullUrl = esc_url(get_author_posts_url($author->ID));
    $url = str_replace(home_url(), '', $fullUrl);
    $tempArray = [
      'url' => $url,
    ];
    array_push($author_urls, $tempArray);
  }
  return array_merge($author_urls);
}

function wsra_generate_taxonomy_api()
{
  [$args,, $taxonomy] = wsra_get_user_inputs();
  $taxonomy_urls = array();
  $taxonomys = $taxonomy == 'tag' ? get_tags($args) : get_categories($args);
  foreach ($taxonomys as $taxonomy) {
    $fullUrl = esc_url(get_category_link($taxonomy->term_id));
    $url = str_replace(home_url(), '', $fullUrl);
    $tempArray = [
      'url' => $url,
    ];
    array_push($taxonomy_urls, $tempArray);
  }
  return array_merge($taxonomy_urls);
}

function wsra_generate_posts_api()
{
  [, $postArgs] = wsra_get_user_inputs();
  $postUrls = array();
  $query = new WP_Query($postArgs);

  while ($query->have_posts()) {
    $query->the_post();
    $uri = str_replace(home_url(), '', get_permalink());
    $tempArray = [
      'url' => $uri,
      'post_modified_date' => get_the_modified_date(),
    ];
    array_push($postUrls, $tempArray);
  }
  wp_reset_postdata();
  return array_merge($postUrls);
}

function wsra_generate_totalpages_api()
{
  $args = array(
    'exclude_from_search' => false
  );
  $argsTwo = array(
    'publicly_queryable' => true
  );
  $post_types = get_post_types($args, 'names');
  $post_typesTwo = get_post_types($argsTwo, 'names');
  $post_types = array_merge($post_types, $post_typesTwo);
  unset($post_types['attachment']);
  $defaultArray = [
    'category' => count(get_categories()),
    'tag' => count(get_tags()),
    'user' => (int)count_users()['total_users'],
  ];
  $tempValueHolder = array();
  foreach ($post_types as $postType) {
    $tempValueHolder[$postType] = (int)wp_count_posts($postType)->publish;
  }
  return array_merge($defaultArray, $tempValueHolder);
}

add_action('rest_api_init', function () {
  register_rest_route('sitemap/v1', '/posts', array(
    'methods' => 'GET',
    'callback' => 'wsra_generate_posts_api',
  ));
});
add_action('rest_api_init', function () {
  register_rest_route('sitemap/v1', '/taxonomy', array(
    'methods' => 'GET',
    'callback' => 'wsra_generate_taxonomy_api',
  ));
});
add_action('rest_api_init', function () {
  register_rest_route('sitemap/v1', '/author', array(
    'methods' => 'GET',
    'callback' => 'wsra_generate_author_api',
  ));
});
add_action('rest_api_init', function () {
  register_rest_route('sitemap/v1', '/totalpages', array(
    'methods' => 'GET',
    'callback' => 'wsra_generate_totalpages_api',
  ));
});
```

## Contacto

Si tienes alguna duda o sugerencia, no dudes en contactarme:

- 👤 [Elias Pereyra](https://github.com/EliasPereyra)
- 📬 [Email](mailto:eliaspereyra_gomez@hotmail.com)
- 🔗 [Linkedin](https://www.linkedin.com/in/elias-pereyra-gomez/)
- 🔗 [Website](http://eliaspereyra.netlify.app)

[Next.js]: https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[GraphQL]: https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white
[Wordpress]: https://img.shields.io/badge/WordPress-21759B?style=for-the-badge&logo=wordpress&logoColor=white
[WPGraphQL]: https://img.shields.io/badge/WPGraphQL-000000?style=for-the-badge&logo=wpgraphql&logoColor=white
[ACF]: https://img.shields.io/badge/ACF-000000?style=for-the-badge&logo=acf&logoColor=white
[Apollo]: https://img.shields.io/badge/Apollo-311C87?style=for-the-badge&logo=apollo&logoColor=white
[Typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Figma]: https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white
[Vitest]: https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white
[msw]: https://img.shields.io/badge/MockServiceWorker-FF6A33?style=for-the-badge&logo=mockserviceworker&logoColor=white
