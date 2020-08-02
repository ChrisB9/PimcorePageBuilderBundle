<?php

declare(strict_types=1);

namespace cbenco\PimcorePageBuilderBundle;

use Pimcore\Extension\Bundle\AbstractPimcoreBundle;
use Pimcore\Extension\Bundle\Traits\PackageVersionTrait;

final class PimcorePageBuilderBundle extends AbstractPimcoreBundle
{
    use PackageVersionTrait;

    private const BUNDLE_PATH = '/bundles/pimcoregrapesjs/';

    protected function getComposerPackageName(): string
    {
        return 'cbenco/PimcorePageBuilderBundle';
    }

    public function getEditmodeCssPaths(): array
    {
        return [
            self::BUNDLE_PATH . 'css/font-awesome.min.css',
            self::BUNDLE_PATH . 'css/grapes.min.css',
            self::BUNDLE_PATH . 'grapeseditor.css',
            self::BUNDLE_PATH . 'css/editmode.css',
        ];
    }

    public function getEditmodeJsPaths(): array
    {
        return [
            self::BUNDLE_PATH . 'js/grapes.min.js',
            self::BUNDLE_PATH . 'grapeseditor.js',
            self::BUNDLE_PATH . 'js/pagebuilderTag.js',
        ];
    }
}
