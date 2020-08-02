<?php

declare(strict_types=1);

namespace cbenco\PimcorePageBuilderBundle\Document\Areabrick;

use Pimcore\Extension\Document\Areabrick\AbstractTemplateAreabrick;
use ReflectionClass;

final class GrapesEditor extends AbstractTemplateAreabrick
{
    public function getName(): string
    {
        return (new ReflectionClass($this))->getShortName();
    }

    public function getId(): string
    {
        return strtolower($this->getName());
    }

    public function getDescription(): string
    {
        return $this->getName() . ': PageBuilder for Pimcore';
    }

    public function getTemplateLocation(): string
    {
        return static::TEMPLATE_LOCATION_BUNDLE;
    }

    public function getTemplateSuffix(): string
    {
        return static::TEMPLATE_SUFFIX_TWIG;
    }
}
