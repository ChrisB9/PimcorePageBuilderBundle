<?php

declare(strict_types=1);

namespace cbenco\PimcorePageBuilderBundle\PageBuilder;

use Pimcore\Model\DataObject;
use Pimcore\Model\DataObject\ClassDefinition\Data;
use Pimcore\Model\DataObject\Concrete;
use Pimcore\Tool\Text;

final class ClassDefinition extends Data implements Data\ResourcePersistenceAwareInterface
{
    use DataObject\Traits\SimpleComparisonTrait;
    use Data\Extension\ColumnType;
    use Data\Extension\QueryColumnType;
    use Data\Extension\Text;

    /** @var string */
    public $fieldtype = 'pagebuilder';

    /**
     * Type for the generated phpdoc
     *
     * @var string
     */
    public $phpdocType = 'string';

    public int $width;
    public int $height;
    public string $queryColumnType = 'longtext';
    public string $columnType = 'longtext';
    public string $toolbarConfig = '';
    public bool $excludeFromSearchIndex = true;


    /**
     * @param mixed $data
     * @param DataObject\AbstractObject|null $object
     * @param array|mixed $params
     * @return mixed
     */
    public function getDataForEditmode($data, $object = null, $params = [])
    {
        return $this->getDataForResource($data);
    }

    /**
     * @param mixed $data
     * @param DataObject\AbstractObject|null $object
     * @param array|mixed $params
     * @return mixed
     */
    public function getDataFromEditmode($data, $object = null, $params = [])
    {
        return $data;
    }

    /**
     * @return string
     */
    public function getToolbarConfig(): string
    {
        return $this->toolbarConfig;
    }

    /**
     * @param string $toolbarConfig
     */
    public function setToolbarConfig(string $toolbarConfig): void
    {
        $this->toolbarConfig = $toolbarConfig;
    }

    /**
     * @return bool
     */
    public function isExcludeFromSearchIndex(): bool
    {
        return $this->excludeFromSearchIndex;
    }

    /**
     * @param bool $excludeFromSearchIndex
     *
     * @return self
     */
    public function setExcludeFromSearchIndex(bool $excludeFromSearchIndex)
    {
        $this->excludeFromSearchIndex = $excludeFromSearchIndex;

        return $this;
    }

    /**
     * @param mixed $data
     * @param Concrete|null $object
     * @param array|mixed $params
     * @return mixed
     */
    public function getDataForResource($data, $object = null, $params = [])
    {
        return $data;
    }

    /**
     * @param mixed $data
     * @param Concrete|null $object
     * @param array|mixed $params
     * @return mixed
     */
    public function getDataFromResource($data, $object = null, $params = [])
    {
        return $data;
    }

    /**
     * @return int
     */
    public function getHeight(): int
    {
        return $this->height;
    }

    /**
     * @param mixed $height
     */
    public function setHeight($height): void
    {
        $this->height = (int)$height;
    }

    /**
     * @return int
     */
    public function getWidth(): int
    {
        return $this->width;
    }

    /**
     * Generates a pretty version preview (similar to getVersionPreview) can be either html or
     * a image URL. See the https://github.com/pimcore/object-merger bundle documentation for details
     *
     * @param string|null $data
     * @param Concrete|null $object
     * @param mixed $params
     *
     * @return array|string
     */
    public function getDiffVersionPreview(?string $data, ?Concrete $object = null, $params = [])
    {
        if ($data) {
            return [
                'html' => $data,
                'type' => 'html'
            ];
        }
        return '';
    }

    /**
     * @param mixed $width
     */
    public function setWidth($width): void
    {
        $this->width = (int)$width;
    }

    public function getDataForSearchIndex($object, $params = []): string
    {
        return '';
    }

    public function isFilterable(): bool
    {
        return false;
    }
}
