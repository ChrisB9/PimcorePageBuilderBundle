<?php

declare(strict_types=1);

namespace cbenco\PimcorePageBuilderBundle\Document;

use Pimcore\Model\Document\Tag;

final class PageBuilderTag extends Tag
{
    /**
     * Contains the PageBuilder-HTML
     * @var string
     */
    public string $html = '';

    /**
     * @return string|void
     */
    public function frontend()
    {
        $text = $this->html;

        return $text;
    }

    /**
     * @return mixed
     */
    public function getData()
    {
        return $this->html;
    }

    public function getType(): string
    {
        return 'pagebuilder';
    }

    /**
     * @param mixed $data
     * @return $this
     */
    public function setDataFromEditmode($data)
    {
        $this->html = $data;
        return $this;
    }

    /**
     * @param mixed $data
     * @return $this
     */
    public function setDataFromResource($data)
    {
        return $this->setDataFromEditmode($data);
    }

    /**
     * @return bool
     */
    public function isEmpty()
    {
        return empty($this->html);
    }
}
