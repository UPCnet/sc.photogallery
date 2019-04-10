# -*- coding: utf-8 -*-
from plone.app.dexterity import MessageFactory as __
from plone.app.textfield import RichText
from plone.supermodel import model
from sc.photogallery import _
from zope import schema
from zope.interface import Interface


class IBrowserLayer(Interface):

    """Add-on layer marker interface."""


class IPhotoGallery(model.Schema):

    """A Photo Gallery content type with a slideshow view."""

    labels = schema.TextLine(
        title=_(u"Etiquetes"),
        description=_(u"Introduiu els noms separats amb comes ','"),
        required=True,
    )
    text = RichText(
        title=_(u'Body text'),
        required=False,
    )

    model.fieldset(
        'settings', label=__(u'Settings'), fields=['allow_download'])
    allow_download = schema.Bool(
        title=_(u'Allow image download?'),
        description=_(
            u'Allow downloading of original images on this photo gallery.'),
        default=True,
    )


class IPhotoGallerySettings(model.Schema):

    """Schema for the control panel form."""

    enable_download = schema.Bool(
        title=_(u'Enable image download globally?'),
        description=_(
            u'Enable download of original images in photo galleries by using an explicit link. '
            u'If ftw.zipexport is installed, enable also downloading of a ZIP file with all the images.'),
        default=False,
    )
