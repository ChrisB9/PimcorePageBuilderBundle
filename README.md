# Pagebuilder for PimCore

This is currently a Work in Progress but already functional implementation of a page builder for pimcore.

The pagebuilder contains a bootstrap-plugin.
In the future, the components should be either standalone or based entirely on tailwindcss.  
It contains an example area-brick, which currently looks like this:
![Backend Layout](doc/example-image-admin.png)

and renders it to the frontend:

![Frontend Layout](doc/example-image-frontend.png)

------------

Next Todos:

- [ ] replacing GrapeJs-Richtext-Editor with PimCore's CKEDITOR
- [ ] Supporting drag'n'drop of assets
- [ ] Supporting upload of videos (currently only images are supported)
- [ ] Adding support for registered Area-Bricks