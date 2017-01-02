# Shopmatic

## System Dependencies

The following are needed by this project:

* [PostgreSQL](http://www.postgresql.org/)
* [Memcached](http://memcached.org/)
* [ImageMagick](http://imagemagick.org/)
* [Node.js](https://nodejs.org/) (to run Bower)
* [Bower](http://bower.io/)
* [PngQuant](https://pngquant.org/)

## External Services

* [Facebook OAuth](https://developers.facebook.com/docs/reference/dialogs/oauth)
* [Google OAuth](https://developers.google.com/accounts/docs/OAuth2)
* [Amazon S3](http://aws.amazon.com/s3/)

## Getting Started

Clone this repository and bundle.

    git clone <repository-url>
    cd shopmatic
    bundle install
    rake bower:install

Create a `database.yml` file from the sample and modify if necessary.
The defaults should be fine.

    cp config/database.yml.sample config/database.yml

Create a `.env` file from the sample so [dotenv](https://github.com/bkeepers/dotenv) can set the required environment variables.
Please obtain any missing values from the project administrator.
Please just use ONLY the .env.development for local development!!

    cp .env.development.sample .env.development
    # then update the HASH_SALT and SECRET_KEY_BASE

Create and initialize the database.

    rake db:create
    rake db:migrate
    bundle exec rails c development

Start the application server.

    bin/rails server

Access the application at [http://localhost:3000/](http://localhost:3000/).

## Optional Dependencies

Set up [MailCatcher](http://mailcatcher.me/) to capture emails in development.

Set up [Pow](http://pow.cx/) with port proxying to route all web traffic on localhost.dev to port 3000.

    echo 3000 > ~/.pow/localhost

The application can now be accessed at [http://localhost.dev/](http://localhost.dev/).
Pow will also handle subdomains like [http://sub.localhost.dev/](http://sub.localhost.dev/).

Set up [FakeS3](https://github.com/jubos/fake-s3) to run a mock Amazon S3 server for development.

If not already installed, install into it's own RVM gemset and create a wrapper so it can be run easily.

    rvm @fakes3 --create do gem install fakes3
    rvm wrapper @fakes3 --no-prefix fakes3

Create a directory for FakeS3 to store uploaded files.

    mkdir ~/fakes3

Start the server.

    fakes3 -r ~/fakes3 -p 10453

Add a port proxy with Pow to ensure all web traffic on fakes3.dev is routed to the server.

    echo 10453 > ~/.pow/fakes3

Ensure `S3_ENDPOINT` is specified in the `.env` file so the application talks to FakeS3 instead of the real S3 server.

    S3_ENDPOINT=http://fakes3.dev

Create base template in development environment.

  setup .env.development (refer to .env.sample and lib/tasks/templates.rake)
  RAILS_ENV=development bundle exec rake templates:import_categories[lib/tasks/templates/categories.json]
  RAILS_ENV=development bundle exec rake templates:create_template[DKJD1K,"base template 01",lib/tasks/templates/base_template_01]
  RAILS_ENV=development bundle exec rake templates:upload_to_store_bucket[NE88ZE,lib/tasks/templates/base_template_01/images]
  RAILS_ENV=development bundle exec rake templates:upload_to_store_bucket[NE88ZE,lib/tasks/templates/base_template_01/thumbnails]

## Testing

Run the test suite with [RSpec](https://github.com/rspec/rspec-rails).

    bin/rspec spec

Or have them run automatically with [Guard](https://github.com/guard/guard-rspec).

    bundle exec guard

## Code Linting

Static code analysis is handled by [RuboCop](https://github.com/bbatsov/rubocop) and [CoffeeLint](https://github.com/zmbush/coffeelint-ruby) and is automatically run as part of the test suite.

To run it manually:

    bin/rubocop
    bin/rake coffeelint

## Deployment

`cap <env> deploy`

## Citrus Pay

To be able to make payments using Citrus Pay you must possess enabled and active payment provider record. Activation takes place when Citrus pay makes POST request to Shopmatic endpoint. In case of development environment you have to enable it manually as accessing your activation endpoint is rather impossible. You can type this in the rails console to add an already active record with test credentials:

```
PaymentProviderRecord.create(merchant_id: [YOUR MERCHANT_ID], payment_provider_id: 'citrus_pay', enabled: true, active: true, country: 'in', secret_key: '259fe54d60ff40cf244702ab62cc8befa1d3d11c', access_key: '18IZE4MDYJTCKUCJ3N67', vanity_url_part: 'nagama2')
```

Make sure you've set up the ENV vars:
```
CITRUS_PAY_VANITY_URL_PART=om2efewuve
CITRUS_PAY_SECRET_KEY=78cdb68ca260bc3549e2567e6e8587d4ee35f9d1
```

### Delhivery

Sandbox Delhivery Api Token: `95e9efba54b035e411765118eccb5e48ea8f7b80`
