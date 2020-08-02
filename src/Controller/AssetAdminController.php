<?php

declare(strict_types=1);

namespace cbenco\PimcoreGrapesJSBundle\Controller;

use Exception;
use Pimcore\Bundle\AdminBundle\Controller\AdminController;
use Pimcore\Config;
use Pimcore\Model\Asset;
use Pimcore\Model\Asset\Image;
use Pimcore\Model\Asset\Image\Thumbnail;
use Pimcore\Model\Element\Service;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

final class AssetAdminController extends AdminController
{
    /**
     * @Route("/get-images", methods={"GET"})
     * @return JsonResponse
     * @throws Exception
     */
    public function imageListAction(): JsonResponse
    {
        $images = Image::getList();
        $urls = [];
        foreach ($images as $image) {
            if (!$image instanceof Image) {
                continue;
            }
            $thumbnail = $image->getThumbnail('pimcore-asset');
            $urls[] = [
                'type' => 'image',
                'width' => $thumbnail->getWidth(),
                'height' => $thumbnail->getHeight(),
                'src' => $image->getThumbnail()->getPath(),
                'category' => 'pimcore-asset',
            ];
        }
        return $this->json(['success' => true, 'urls' => $urls]);
    }

    /**
     * @Route("/add-image", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function addImageAction(Request $request): JsonResponse
    {
        // this should already have happend through the middleware
        $this->checkCsrfToken($request);
        $file = $request->files->get('grapes-upload');
        assert($file instanceof UploadedFile);
        // todo: register as service
        $config = \Pimcore::getContainer()->get(Config::class);
        $defaultUploadPath = $config['assets']['default_upload_path'] ?? '/';

        $filename = Service::getValidKey($file->getClientOriginalName(), 'asset');
        if (empty($filename)) {
            throw new \Exception('Filename is mal-configured');
        }
        $parent = Asset::getByPath('/'. $defaultUploadPath);
        assert($parent instanceof Asset\Folder);
        $asset = Asset::getByPath('/'. $defaultUploadPath . '/' . $filename) ?? Asset::create($parent->getId(), [
            'filename' => $filename,
            'sourcePath' => $file->getRealPath(),
            'userOwner' => $this->getAdminUser()->getId(),
            'userModification' => $this->getAdminUser()->getId()
        ]);
        @unlink($file->getPath());
        $thumbnail = $asset->getThumbnail('pimcore-asset');

        return $this->adminJson([
            'type' => 'image',
            'width' => $thumbnail->getWidth(),
            'height' => $thumbnail->getHeight(),
            'src' => $thumbnail->getPath(),
            'category' => 'pimcore-asset',
        ]);
    }
}
